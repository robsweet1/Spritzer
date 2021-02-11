import { useDispatch } from 'react-redux'
import { changeDrawSize } from 'state-slices/editorToolsSlice'
import InputNumber from 'antd/es/input-number'
import Typography from 'antd/es/typography'
const { Title } = Typography

const DrawSizeChanger = () => {
    const dispatch = useDispatch()


    const changeSize = (newSize) => {
        dispatch(changeDrawSize(newSize))
    }

    return (
        <div className='draw-size-box'>
            <Title level={4}>Tool Size</Title>
            <InputNumber min={1} max={8} defaultValue={1} onChange={changeSize}></InputNumber>
        </div>
    )
}

export default DrawSizeChanger