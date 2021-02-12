import axios from 'axios'
import { Button, Form, Input, Tabs } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

const { TabPane } = Tabs;

const AuthModal = (props) => {
    const [form] = Form.useForm()

    const handleAuth = async (authType) => {
        let email = form.getFieldValue('email')
        let password = form.getFieldValue('password')
        axios.post(`http://localhost:5000/${authType}`, {
            email: email,
            password: password
        }).then(response => {
            console.log(response)
            props.setAuthOpen(false)
        })
    }

    return (
        <div className='modal-box'>
            <Tabs defaultActiveKey={props.authType}>
                <TabPane tab='Sign Up' key='1'>
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
                            <Button type='primary' onClick={() => handleAuth('signup')}>Sign Up</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => {props.setAuthOpen(false)}}>Close</Button>
                        </Form.Item>   
                    </Form>
                </TabPane>
                <TabPane tab='Log In' key='2'>
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
                            <Button type='primary' onClick={() => handleAuth('login')}>Log In</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={() => {props.setAuthOpen(false)}}>Close</Button>
                        </Form.Item>   
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AuthModal