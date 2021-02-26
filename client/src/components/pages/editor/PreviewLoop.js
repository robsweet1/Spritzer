import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectFrames, selectDimensions } from 'state-slices/framesSlice'
import Sketch from 'react-p5'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'

import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'


const PreviewLoop = (props) => {
    const framesArray = useSelector(selectFrames)
    const dimensions = useSelector(selectDimensions)
    const frameIndex = useRef(0)
    const [p5Object, setP5Object] = useState()
    const [pauseTitle, setPauseTitle] = useState('Play')
    const [frameRate, setFrameRate] = useState(8)

    let width = dimensions.width
    let height = dimensions.height
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

    const changeFrameRate = (amount) => {
        let newRate = frameRate + amount
        if (newRate > 60){
            newRate = 60              
        }
        else if (newRate < 1){
            newRate = 1
        }
        setFrameRate(newRate)
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
            <Box className='vertical-flex frame-box' style={{width: width * scale, height: height * scale}} >
                <Sketch 
                    className='sketch' 
                    setup={setup} 
                    draw={draw} 
                    mousePressed={haltLoop} 
                    mouseReleased={haltLoop}
                />
                <Button className='frame-btn visible btm-left-btn' color='primary' onClick={pauseButton}>
                    {pauseTitle === 'Play' ? <AiFillPlayCircle /> : <AiFillPauseCircle /> }
                </Button>
            </Box>
            <Box>
                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='increase'
                    onClick={() => changeFrameRate(1)}
                    >
                    <Add />
                </IconButton>
                <Typography variant='h5'>
                    {frameRate}
                </Typography>
                <IconButton 
                    edge='start'
                    color='inherit'
                    aria-label='increase'
                    onClick={() => changeFrameRate(-1)}
                    >
                    <Remove />
                </IconButton>
            </Box>
        </>
    )
}

export default PreviewLoop