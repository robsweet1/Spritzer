import Sketch from 'react-p5'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { selectDrawSize, selectEditorTool } from '../../../features/editor-slices/editorToolsSlice'
import { selectColor, changeColor } from '../../../features/editor-slices/colorPickerSlice'
import { selectFrames, selectCurrentFrameId, updateFrame } from '../../../features/editor-slices/framesSlice'

const EditorGrid = () => {
    const mapTool = useSelector(selectEditorTool)
    const drawSize = useSelector(selectDrawSize)
    const color = useSelector(selectColor)
    const framesArray = useSelector(selectFrames)
    const currentFrameId = useSelector(selectCurrentFrameId)
    const gridArray = useRef([])
    const dispatch = useDispatch()

    let width = 512
    let height = 512
    let scale = 16
    let rectSize = width / scale
    let numCols = width / rectSize
    let numRows = height / rectSize

    useEffect(() => {
        if(framesArray[0].array.length === [].length){
            gridArray.current = new Array(numCols * numRows).fill({r: 0, g: 0, b: 0, a: 0})
            updateFrameState(currentFrameId)
        }
    }, [])
    useEffect(() => {
        if(framesArray.find(item => item.id === currentFrameId)){
            gridArray.current = framesArray.find(array => array.id === currentFrameId).array.slice()
        }
           
    }, [currentFrameId, framesArray.length, numCols, numRows])

    const updateFrameState = (id) => {
        let tempArray = gridArray.current.slice()
        dispatch(updateFrame({id: id, array: tempArray}))
    }

    const mouseGridCoords = (p5) => {
        if (p5.mouseX > width || p5.mouseY < 0 || p5.mouseY > height || p5.mouseX < 0)
            return null
        let gridX = Math.floor(p5.mouseX  / rectSize)
        let gridY = Math.floor(p5.mouseY  / rectSize)
        return [gridX, gridY]
    }

    const toolUse = (p5) => {
        let coords = mouseGridCoords(p5)
        if (!coords)
            return
        let gridX = coords[0]
        let gridY = coords[1]

        switch(mapTool) {
            case 'erase':
                toolHelper(gridX, gridY, {r: 0, g: 0, b: 0, a: 0}, false)
                break

            case 'draw':
                toolHelper(gridX, gridY, color, false)
                break

            case 'pick':
                let index = (gridY * numCols) + gridX
                if(gridArray.current[index]['a'] !== 0){
                    let tempColor = gridArray.current[index]
                    dispatch(changeColor(tempColor))
                }
                break

            case 'mirror':
                toolHelper(gridX, gridY, color, true)
                break
            default:
                return false
        }
        return false
    }

    const toolHelper = (gridX, gridY, color, mirror) => {
        let different = false
        for (let x = -Math.floor(drawSize / 2); x < Math.ceil(drawSize / 2); x++){
            for (let y = -Math.floor(drawSize / 2); y < Math.ceil(drawSize / 2); y++) {
                let yCalc = (gridY * numCols) + (numCols * y)
                let index = yCalc + (gridX + x)
                if (index >= Math.floor(yCalc) && index < (Math.floor(yCalc) + numCols)){
                    if (!colorEqual(gridArray.current[index], color)){
                        gridArray.current[index] = color
                        different = true
                    }
                }
                if (mirror){
                    let mirrorIndex = yCalc + ((numCols / 2) + ((numCols / 2) - (gridX + x))) - 1
                    if (mirrorIndex >= Math.floor(yCalc) && mirrorIndex < (Math.floor(yCalc) + numCols)){
                        if (!colorEqual(gridArray.current[mirrorIndex], color)){
                            gridArray.current[mirrorIndex] = color
                            different = true
                        }
                    }
                }
            }
        }
        if (different)
            updateFrameState(currentFrameId)
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
        p5.createCanvas(width, height).parent(canvasParentRef)
        gridArray.current = new Array(numCols * numRows).fill({r: 0, g: 0, b: 0, a: 0})
        updateFrameState(currentFrameId)
    }

    const draw = (p5) => {
        p5.erase()
        p5.rect(0, 0, width, height)
        p5.noErase()
        p5.fill('rgba(0, 0, 0, 0.3)')
        let coords = mouseGridCoords(p5)
        if (coords && mapTool !== 'pick')
            p5.rect((coords[0] - Math.floor(drawSize / 2)) * rectSize, (coords[1] - Math.floor(drawSize / 2)) * rectSize, rectSize * drawSize, rectSize * drawSize)
        for(let x = 0; x < numRows; x++){
            for(let y = 0; y < numCols; y++){
                if(gridArray.current[y * numCols + x] !== 0){
                    let color = gridArray.current[y * numCols + x]
                    p5.fill(`rgba(${color['r']}, ${color['g']}, ${color['b']}, ${color['a']})`)
                    p5.rect(x * rectSize, y * rectSize, rectSize, rectSize)
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