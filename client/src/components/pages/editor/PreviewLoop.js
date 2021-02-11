import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectFrames } from 'state-slices/framesSlice'
import Sketch from 'react-p5'
import Button from 'antd/es/button'
import InputNumber from 'antd/es/input-number'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'

const PreviewLoop = (props) => {
    const framesArray = useSelector(selectFrames)
    const frameIndex = useRef(0)
    const [p5Object, setP5Object] = useState()
    const [pauseTitle, setPauseTitle] = useState('Play')

    let width = props.width
    let height = props.height
    let scale = 128 / width

    const setup = (p5, canvasParentRef) => {
        setP5Object(p5)
        p5.noStroke()
        p5.colorMode('RGB', 255, 255, 255, 1)
        p5.createCanvas(width * scale, height * scale).parent(canvasParentRef)
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
        p5.scale(scale)
        p5.erase()
        p5.rect(0, 0, width, height)
        p5.noErase()
        if (framesArray.length === 0 || !framesArray[frameIndex.current]){
            incrementIndex()
            return
        }
        let currentFrame = framesArray[frameIndex.current].array
        if (!currentFrame || currentFrame.length !== (height * width)) {
            incrementIndex()
            return
        }
        for(let x = 0; x < height; x++){
            for(let y = 0; y < width; y++){
                if(currentFrame[y * width + x] !== 0){
                    let color = currentFrame[y * width + x]
                    p5.fill(`rgba(${color['r']}, ${color['g']}, ${color['b']}, ${color['a']})`)
                    p5.rect(x, y, 1, 1)
                }
            }
        }
        incrementIndex()
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
            <div className='vertical-flex frame-box' style={{width: width * scale, height: height * scale}} >
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