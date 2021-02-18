import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initName, initEmail, selectCurrentFrameId, updateFrame } from 'state-slices/framesSlice'
import Button from 'antd/es/button'
import InputNumber from 'antd/es/input-number'
import { Form, Input, } from 'antd'
import { useCookies } from 'react-cookie'


const NewSpriteModal = (props) => {
    const history = useHistory()
    const [form] = Form.useForm()
    const [cookies] = useCookies()
    const currentFrameId = useSelector(selectCurrentFrameId)
    const dispatch = useDispatch()

    const openNewSprite = () => {
        let width = form.getFieldValue('width')
        let name = form.getFieldValue('name')
        let state = {
            name: name,
            width: width,
        }
        let gridArray = new Array(width * width).fill({ r: 0, g: 0, b: 0, a: 0 })
        dispatch(initEmail(cookies.email))
        dispatch(initName(name))
        dispatch(updateFrame({ id: currentFrameId, array: gridArray }))
        history.push('/editor', state)
    }

    return (
        <div className='modal-box'>
            <Form
                layout='horizontal'
                form={form}
            >
                <Form.Item label='Name' name='name' initialValue='untitledSprite'>
                    <Input placeholder='Mario' />
                </Form.Item>
                <Form.Item label='Dimensions' name='width' initialValue={32}>
                    <InputNumber min={8} max={64} step={8} />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" onClick={openNewSprite}>Create Sprite</Button>
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => { props.setModalOpen(false) }}>Close Modal</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default NewSpriteModal