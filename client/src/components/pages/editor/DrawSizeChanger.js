import { useDispatch } from 'react-redux'
import { changeDrawSize } from 'state-slices/editorToolsSlice'

import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'


const DrawSizeChanger = () => {
    const dispatch = useDispatch()


    const changeSize = (event, newSize) => {
        dispatch(changeDrawSize(newSize))
    }

    return (
        <div className='draw-size-box'>
            <Typography id='drawSize-slider' gutterBottom>
                Tool Size
            </Typography>
            <Slider
                defaultValue={1}
                // getAriaValueText={valuetext}
                aria-labelledby="drawSize-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={4}
                onChange={changeSize}
            />
        </div>
    )
}

export default DrawSizeChanger