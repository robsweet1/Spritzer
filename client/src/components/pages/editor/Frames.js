import Button from 'antd/es/button'
import { useDispatch, useSelector} from 'react-redux'
import { changeCurrentFrameId, selectFrames, addFrame, updateAllFrames } from '../../../features/editor-slices/framesSlice'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Frame from './Frame'
import shortId from 'shortid'
import LazyLoad from 'react-lazyload'

const Frames = () => {
    const dispatch = useDispatch()
    const framesArray = useSelector(selectFrames)
    let numRows = 16
    let numCols = 16

    const newFrame = () => {
        const id = shortId.generate()
        dispatch(addFrame(
            {
                id: id, 
                array: Array(numCols * numRows).fill({r: 0, g: 0, b: 0, a: 0})
            }
        ))
        dispatch(changeCurrentFrameId(id))
    }


    const onDragEnd = (result) => {
        if (!result.destination) {
            return
        }
        const tempArray = framesArray.slice()
        const [removed] = tempArray.splice(result.source.index, 1)
        tempArray.splice(result.destination.index, 0, removed)
        dispatch(updateAllFrames(tempArray))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" >
                {(provided) => {
                    return (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {framesArray.map((frame, index) => {
                                return (
                                    <LazyLoad height={200} once={true} overflow={true} key={frame.id} >
                                    <Draggable draggableId={frame.id} index={index} className='frame-preview vertical-flex'>
                                        {(provided) => {
                                            return (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Frame index={index} id={frame.id} array={frame.array}/>
                                                    {provided.placeholder}
                                                </div>
                                        )}}
                                    </Draggable>
                                    </LazyLoad>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                )}}
            </Droppable>
            <Button onClick={newFrame}>
                Add Frame
            </Button>
        </DragDropContext>
    )
}
export default Frames