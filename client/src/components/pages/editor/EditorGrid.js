import Sketch from 'react-p5'
import { useEffect, useRef} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { resetTool, selectDrawSize, selectEditorTool } from 'state-slices/editorToolsSlice'
import { selectColor, changeColor, resetColor } from 'state-slices/colorPickerSlice'
import { selectFrames, selectCurrentFrameId, updateFrame, resetFramesState, selectDimensions } from 'state-slices/framesSlice'

const EditorGrid = (props) => {
    const mapTool = useSelector(selectEditorTool)
    const drawSize = useSelector(selectDrawSize)
    const color = useSelector(selectColor)
    const framesArray = useSelector(selectFrames)
    const dimensions = useSelector(selectDimensions)
    const currentFrameId = useSelector(selectCurrentFrameId)
    const gridArray = useRef([])
    const dispatch = useDispatch()

    let width = dimensions.width
    let height = dimensions.height
    let scale = 640 / width
    let gridWidth = width * scale


    useEffect(() => {
        return () => {
            dispatch(resetFramesState())
            dispatch(resetTool())
            dispatch(resetColor())
        }
    }, [])
    
    useEffect(() => {
        if(framesArray.find(item => item.id === currentFrameId)){
            gridArray.current = framesArray.find(array => array.id === currentFrameId).array.slice()
        }
           
    }, [currentFrameId])


    const updateFrameState = (id) => {
        let tempArray = gridArray.current.slice()
        dispatch(updateFrame({id: id, array: tempArray}))
    }

    const mouseGridCoords = (p5) => {
        if (p5.mouseX > (gridWidth) || p5.mouseY < 0 || p5.mouseY > (gridWidth) || p5.mouseX < 0)
            return null
        let gridX = Math.floor(p5.mouseX / scale)
        let gridY = Math.floor(p5.mouseY / scale)
        return [gridX, gridY]
    }

    const toolUse = (p5) => {
        p5.noLoop()
        let coords = mouseGridCoords(p5)
        if (!coords){
            p5.loop()
            return false
        }
        let gridX = coords[0]
        let gridY = coords[1]

        switch(mapTool) {
            case 'erase':
                toolHelper(gridX, gridY, {r: 0, g: 0, b: 0, a: 0}, false, p5)
                break

            case 'draw':
                toolHelper(gridX, gridY, color, false, p5)
                break

            case 'pick':
                let index = (gridY * width) + gridX
                if(gridArray.current[index]['a'] !== 0){
                    let tempColor = gridArray.current[index]
                    dispatch(changeColor(tempColor))
                }
                break

            case 'mirror':
                toolHelper(gridX, gridY, color, true, p5)
                break
            default:
                p5.loop()
                return false
        }
        p5.loop()
        return false
    }

    const toolHelper = (gridX, gridY, color, mirror, p5) => {
        let different = false
        for (let x = -Math.floor(drawSize / 2); x < Math.ceil(drawSize / 2); x++){
            for (let y = -Math.floor(drawSize / 2); y < Math.ceil(drawSize / 2); y++) {
                let yCalc = (gridY * width) + (width * y)
                let index = yCalc + (gridX + x)
                if (index >= Math.floor(yCalc) && index < (Math.floor(yCalc) + width) && index < gridArray.current.length){
                    if (!colorEqual(gridArray.current[index], color)){
                        p5.redraw()
                        gridArray.current[index] = color
                        different = true
                    }
                }
                if (mirror){
                    let mirrorIndex = yCalc + ((width / 2) + ((width / 2) - (gridX + x))) - 1
                    if (mirrorIndex >= Math.floor(yCalc) && mirrorIndex < (Math.floor(yCalc) + width) && index < gridArray.current.length){
                        if (!colorEqual(gridArray.current[mirrorIndex], color)){
                            gridArray.current[mirrorIndex] = color
                            different = true
                        }
                    }
                }
            }
        }
        if (different) {
            updateFrameState(currentFrameId)
            props.setSaved(false)
        }
            
    }

    const colorEqual = (c1, c2) => {
        if (!c1 || !c2)
            return false
        if (c1['a'] === c2['a'] && c1['b'] === c2['b'] && c1['g'] === c2['g'] && c1['b'] === c2['b'])
            return true
        return false
    }

    const setup = (p5, canvasParentRef) => {
        p5.noStroke()
        p5.colorMode('RGB', 255, 255, 255, 1)
        p5.createCanvas(gridWidth, gridWidth).parent(canvasParentRef)
    }

    const draw = (p5) => {
        p5.scale(scale)
        p5.erase()
        p5.rect(0, 0, width, height)
        p5.noErase()
        p5.fill('rgba(0, 0, 0, 0.3)')

        if (gridArray.current.length !== (width * height))
            return

        let coords = mouseGridCoords(p5)
        if (coords && mapTool !== 'pick'){
            let gridX = coords[0]
            let gridY = coords[1]
            let previewShadowX = (gridX - Math.floor(drawSize / 2))
            let previewShadowY = (gridY - Math.floor(drawSize / 2))
            p5.rect(previewShadowX, previewShadowY, drawSize, drawSize)
        }
            
        for(let x = 0; x < height; x++){
            for(let y = 0; y < width; y++){
                if(gridArray.current[y * width + x] !== 0){
                    let color = gridArray.current[y * width + x]
                    p5.fill(`rgba(${color['r']}, ${color['g']}, ${color['b']}, ${color['a']})`)
                    p5.rect(x, y, 1, 1)
                }
            }
        }
    }
    const mouseMoved = () => {
        return false
    }

    return (
        <Sketch setup={setup} draw={draw} mouseClicked={toolUse} mouseDragged={toolUse} mouseMoved={mouseMoved}/>
    )
}

export default EditorGrid