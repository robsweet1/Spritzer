import { useDispatch, useSelector  } from 'react-redux'
import { SketchPicker } from 'react-color'
import { changeColor, selectColor } from 'state-slices/colorPickerSlice'

const ColorPicker = () => {
    const dispatch = useDispatch()
    const color = useSelector(selectColor)

    const colorChange = (color) => {
        dispatch(changeColor(color.rgb))
    }

    return (
        <SketchPicker
            color={color}
            onChange={colorChange}
        />
    )
}

export default ColorPicker