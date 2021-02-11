import { useRef, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { changeCurrentFrameId, selectFrames, selectCurrentFrameId, removeFrame, cloneFrame} from 'state-slices/framesSlice'
import Button from 'antd/es/button'
import Sketch from 'react-p5'
import shortId from 'shortid'
import { IoCopy } from 'react-icons/io5'
import { AiFillDelete } from 'react-icons/ai'


const Frame = (props) => {
    const dispatch = useDispatch()
    const currentFrameId = useSelector(selectCurrentFrameId)
    const framesArray = useSelector(selectFrames)
    const frameRef = useRef()

    let width = props.width
    let height = props.height
    let scale = 128 / width

    useEffect(() => {
        if(props.id === currentFrameId){
            let node = frameRef.current
            node.classList.add('current-frame')
            return () => {
                node.classList.remove('current-frame')
            }
        }
    }, [currentFrameId, props.id])
    
    const dupeFrame = (originalId, array) => {
        const newId = shortId.generate()
        dispatch(cloneFrame(
            {
                originalId: originalId,
                newId: newId,
                array: array,
            }
        ))
    }

    const setup = (p5, canvasParentRef) => {
        p5.noLoop()
        p5.noStroke()
        p5.colorMode('RGB', 255, 255, 255, 1)
        p5.createCanvas(width * scale, height * scale).parent(canvasParentRef)
    }

    const draw = (p5, frame) => {
        p5.scale(scale)
        if (!frame || frame.length !== (width * height))
            return
        p5.erase()
        p5.rect(0, 0, width, height)
        p5.noErase()
        for(let x = 0; x < height; x++){
            for(let y = 0; y < width; y++){
                if(frame[y * width + x] !== 0){
                    let color = frame[y * width + x]
                    p5.fill(`rgba(${color['r']}, ${color['g']}, ${color['b']}, ${color['a']})`)
                    p5.rect(x, y, 1, 1)
                }
            }
        }
    }

    const mouseClicked = (p5, id) => {
        if (id === currentFrameId) {
            p5.redraw()
        }
    }

    return (
        <div 
            className='vertical-flex frame-box' 
            id={props.id} 
            ref={frameRef} 
            style={{width: (width * scale) + 5, height: (height * scale) + 5}} 
        >
            <span className='frame-index'>{props.index}</span>
            <div onClick={() => dispatch(changeCurrentFrameId(props.id))}>
                <Sketch 
                    className='sketch' 
                    style={{width: (width * scale), height: (height * scale)}} 
                    setup={setup} 
                    draw={(p5) => {draw(p5, props.array, props.index)}} 
                    mouseClicked={(p5) => {mouseClicked(p5, props.id)}} 
                />
                {framesArray.length > 1 && 
                    <Button className={'frame-btn btm-left-btn'} onClick={() => dispatch(removeFrame(props.id))}>
                        <AiFillDelete/>
                    </Button>
                }
                <Button className={'frame-btn btm-right-btn'} onClick={() => dupeFrame(props.id, props.array)}>
                    <IoCopy/>
                </Button>
            </div>
        </div>
    )
}

export default Frame