import { useState } from 'react'
import Button from 'antd/es/button'
import Layout from 'antd/es/layout'
import Navbar from 'components/Navbar'
import NewSpriteModal from 'components/pages/home/NewSpriteModal'
import AuthModal from './AuthModal'

const { Header, Footer, Sider, Content } = Layout

const HomePage = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [authOpen, setAuthOpen] = useState(false)

    return (
        <Layout style={{ height: '100vh' }}>
            {modalOpen ? <NewSpriteModal setModalOpen={setModalOpen} /> : null}
            {authOpen ? <AuthModal setAuthOpen={setAuthOpen} /> : null}
            <Header>
                <Navbar currentPage={'home'} setAuthOpen={setAuthOpen} />
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
                </Sider>
            </Layout>
            <Footer></Footer>
        </Layout>
    )
}

export default HomePage