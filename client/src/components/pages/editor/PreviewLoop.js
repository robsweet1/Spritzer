import { useRef, useState } from 'react'
import Button from 'antd/es/button'
import InputNumber from 'antd/es/input-number'
import Sketch from 'react-p5'
import { useSelector } from 'react-redux'
import { selectFrames } from '../../../features/editor-slices/framesSlice'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'

const PreviewLoop = () => {
    const framesArray = useSelector(selectFrames)
    const frameIndex = useRef(0)
    const [p5Object, setP5Object] = useState()
    const [pauseTitle, setPauseTitle] = useState('Play')

    let width = 128
    let height = 128
    let numRows = 16
    let numCols = 16
    let rectSize = 8

    const setup = (p5, canvasParentRef) => {
        setP5Object(p5)
        p5.noStroke()
        p5.colorMode('RGB', 255, 255, 255, 1)
        p5.createCanvas(width, height).parent(canvasParentRef)
        p5.frameRate(8)
        p5.noLoop()
    }

    const incrementIndex = () => {
        if (frameIndex.current >= framesArray.length - 1)
            frameIndex.current = 0
        else
            frameIndex.current++
    }

    const draw = (p5) => {
        p5.erase()
        p5.rect(0, 0, width, height)
        p5.noErase()
        if (framesArray.length === 0 || !framesArray[frameIndex.current]){
            incrementIndex()
            return
        }
        let currentFrame = framesArray[frameIndex.current].array
        incrementIndex()
        if (currentFrame === undefined)
            return
        for(let x = 0; x < numRows; x++){
            for(let y = 0; y < numCols; y++){
                if(currentFrame[y * numCols + x] !== 0){
                    let color = currentFrame[y * numCols + x]
                    p5.fill(`rgba(${color['r']}, ${color['g']}, ${color['b']}, ${color['a']})`)
                    p5.rect(x * rectSize, y * rectSize, rectSize, rectSize)
                }
            }
        }
    }

    const pauseButton = () => {
        if (p5Object.isLooping()) {
            p5Object.noLoop()
            setPauseTitle('Play')
        }

        else {
            p5Object.loop()
            setPauseTitle('Pause')
        }
    }

    const changeFrameRate = (newRate) => {
        if (newRate > 60)
            newRate = 60
        else if (newRate < 1)
            newRate = 1
        p5Object.frameRate(newRate)
    }

    const haltLoop = () => {
        if (pauseTitle === 'Play') {
            return
        }
        if (p5Object.isLooping()) {
            p5Object.noLoop()
        }
        else {
            p5Object.loop()
        }
    }


    return (
        <>
            <h3>Preview</h3>
            <div className='vertical-flex frame-box' style={{width: width, height: height}} >
                <Sketch 
                    className='sketch' 
                    setup={setup} 
                    draw={draw} 
                    mousePressed={haltLoop} 
                    mouseReleased={haltLoop}
                />
                <Button className='frame-btn visible btm-left-btn' onClick={pauseButton}>
                    {pauseTitle === 'Play' ? <AiFillPlayCircle /> : <AiFillPauseCircle /> }
                </Button>
            </div>
            <InputNumber 
                min={1} 
                max={60} 
                defaultValue={8} 
                onChange={changeFrameRate} 
                formatter={value => `fps: ${value}`}
                parser={value => value.replace('fps: ', '')}
            />
        </>
    )
}

export default PreviewLoop