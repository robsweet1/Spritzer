import { useState } from 'react'
import axios from 'axios'
import { Button, Form, Input, } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

const AuthModal = (props) => {
    const [authType, setAuthType] = useState(props.authType)
    const [form] = Form.useForm()

    const handleSignUp = () => {
        let email = form.getFieldValue('email')
        let password = form.getFieldValue('password')
        axios.post('http://localhost:5000/signup', {
            email: email,
            password: password
        }).then(response => {
            console.log(response)
            props.setAuthOpen(false)
        })
    }
    return (
        <div className='modal-box'>
            <Form
                layout='horizontal'
                form={form}
            >
                <Form.Item label='Email' name='email' initialValue=''>
                    <Input placeholder='email@email.com' />
                </Form.Item>
                <Form.Item label='Password' name='password' initialValue=''>
                    <Input.Password 
                        placeholder='password' 
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" onClick={handleSignUp}>Sign Up</Button>
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => {props.setAuthOpen(false)}}>Close</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AuthModal