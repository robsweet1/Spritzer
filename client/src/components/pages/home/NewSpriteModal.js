import { useHistory } from 'react-router-dom'
import Button from "antd/es/button"
import InputNumber from 'antd/es/input-number'
import { Form, Input, } from 'antd'


const NewSpriteModal = (props) => {
    const history = useHistory()
    const [form] = Form.useForm()

    const openNewSprite = () => {
        let state = {
            name: form.getFieldValue('name'),
            // height: form.getFieldValue('height'),
            width: form.getFieldValue('width'),
        }
        history.push('/editor', state)
    }

    return (
        <div className='modal-box'>
            <Form
                layout='horizontal'
                form={form}
            >
                <Form.Item label='Name' name='name' initialValue='untitledSprite'>
                    <Input placeholder='Mario'/>
                </Form.Item>
                <Form.Item label='Dimensions' name='width' initialValue={32}>
                    <InputNumber min={8} max={64} step={8} />
                </Form.Item>
                {/* <Form.Item label='Height' name='height' initialValue={64}>
                    <InputNumber min={8} max={64} step={32} />
                </Form.Item> */}
                <Form.Item >
                    <Button type="primary" onClick={openNewSprite}>Create Sprite</Button>
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => {props.setModalOpen(false)}}>Close Modal</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default NewSpriteModal