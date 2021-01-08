import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { SketchPicker } from 'react-color'
import { changeColor } from '../../../features/editor-slices/colorPickerSlice'
import { selectColor } from '../../../features/editor-slices/colorPickerSlice'

const ColorPicker = () => {
    const dispatch = useDispatch()
    const storeColor = useSelector(selectColor)

    const colorChange = (color) => {
        dispatch(changeColor(color.rgb))
    }

    return (
        <SketchPicker
            color={storeColor}
            onChange={colorChange}
        />
    )
}

export default ColorPicker