import { useEffect, useState } from 'react'
import Button from 'antd/es/button'
import Layout from 'antd/es/layout'
import Navbar from 'components/Navbar'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const { Header, Footer, Sider, Content } = Layout

const ProfilePage = (props) => {
    const [username, setUsername] = useState('')
    const [cookies] = useCookies()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/secure/profile?secret_token=${cookies.token}`)
            .then(response => {
                setUsername(response.data.user.email)
            })
            .catch(error => {
                console.log(error)
                props.history.push('/')
            })
    }, [])

    return (
        <Layout style={{ height: '100vh' }}>
            <Header>
                <Navbar currentPage={'profile'} history={props.history} />
            </Header>
            <Layout>
                <Sider width={250} >
                </Sider>
                <Layout>
                    <Content className='main-content' >
                        {/* <Button onClick={() => setModalOpen(true)}>New Sprite</Button> */}
                    </Content>
                </Layout>
                <Sider width={250}>
                    <h1>{username}</h1>
                </Sider>
            </Layout>
            <Footer></Footer>
        </Layout>
    )
}

export default ProfilePage