import { useEffect, useState } from 'react'
import Button from 'antd/es/button'
import Layout from 'antd/es/layout'
import Navbar from 'components/Navbar'
import NewSpriteModal from 'components/pages/home/NewSpriteModal'
import { getProfile } from 'api/auth'
import { useCookies } from 'react-cookie'

const { Header, Footer, Sider, Content } = Layout

const ProfilePage = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [cookies] = useCookies()

    useEffect(() => {
        getProfile(cookies.token)
            .then(user => setUsername(user.email))
            .catch(error => console.log(error))
    }, [])

    return (
        <Layout style={{ height: '100vh' }}>
            {modalOpen ? <NewSpriteModal setModalOpen={setModalOpen} /> : null}
            <Header>
                <Navbar currentPage={'profile'} history={props.history} />
            </Header>
            <Layout>
                <Sider width={250} >
                </Sider>
                <Layout>
                    <Content className='main-content' >
                        <Button onClick={() => setModalOpen(true)}>New Sprite</Button>
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