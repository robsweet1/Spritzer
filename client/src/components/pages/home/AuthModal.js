import axios from 'axios'
import { login, signup } from 'api/auth'
import { useCookies } from 'react-cookie'
import { Button, Form, Input, Tabs } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'

const { TabPane } = Tabs;

const AuthModal = (props) => {
    const [form] = Form.useForm()
    const [cookies, setCookie] = useCookies(['token', 'loggedin'])

    const handleAuth = async (authType) => {
        let email = form.getFieldValue('email')
        let password = form.getFieldValue('password')
        if (authType === 'login') {
            login(email, password)
                .then(data => {
                    setCookie('token', data.token, { sameSite: true, path: '/' })
                    setCookie('email', email, { sameSite: true, path: '/' })
                    props.setAuthOpen(false)
                    props.history.push('/profile')
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else if (authType === 'signup') {
            signup(email, password)
                .then(data => console.log(data))
                .catch(error => console.log(error))
        }
        // axios.post(`http://localhost:5000/api/auth/${authType}`, {
        //     email: email,
        //     password: password
        // })
        //     .then(response => {
        //         if (authType === 'login') {
        //             setCookie('token', response.data.token, { sameSite: true, path: '/' })
        //             setCookie('email', email, { sameSite: true, path: '/' })
        //             props.setAuthOpen(false)
        //             props.history.push('/profile')
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    return (
        <div className='modal-box'>
            <Tabs defaultActiveKey={props.authType}>
                <TabPane tab='Sign Up' key='signup'>
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
                            <Button onClick={() => { props.setAuthOpen(false) }}>Close</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab='Log In' key='login'>
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
                            <Button onClick={() => { props.setAuthOpen(false) }}>Close</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AuthModal