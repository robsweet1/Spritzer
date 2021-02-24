import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentFrameId, selectFrames, selectDimensions, addFrame, updateAllFrames } from 'state-slices/framesSlice'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Button from 'antd/es/button'
import shortId from 'shortid'
// import LazyLoad from 'react-lazyload'
import Frame from 'components/pages/editor/Frame'

const Frames = (props) => {
    const dispatch = useDispatch()
    const framesArray = useSelector(selectFrames)
    const dimensions = useSelector(selectDimensions)

    let width = dimensions.width
    let height = dimensions.height

    const newFrame = () => {
        const id = shortId.generate()
        dispatch(addFrame(
            {
                id: id,
                array: Array(width * height).fill({ r: 0, g: 0, b: 0, a: 0 })
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
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {framesArray.map((frame, index) => {
                                return (
                                    // <LazyLoad
                                    //     height={200}
                                    //     once={true}
                                    //     overflow={true}
                                    //     key={frame.id}
                                    // >
                                        <Draggable
                                            draggableId={frame.id}
                                            index={index}
                                            className='frame-preview vertical-flex'
                                        >
                                            {(provided) => {
                                                return (
                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <Frame
                                                            index={index}
                                                            id={frame.id}
                                                            array={frame.array}
                                                            height={height}
                                                            width={width}
                                                            scale={props.scale}
                                                        />
                                                        {provided.placeholder}
                                                    </div>
                                                )
                                            }}
                                        </Draggable>
                                    // </LazyLoad>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
            <Button onClick={newFrame}>
                Add Frame
            </Button>
        </DragDropContext>
    )
}
export default Frames