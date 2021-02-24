import { useState } from 'react'
import Button from 'antd/es/button'
import Layout from 'antd/es/layout'
import Navbar from 'components/Navbar'
import NewSpriteModal from 'components/pages/home/NewSpriteModal'
import AuthModal from 'components/pages/home/AuthModal'

const { Header, Footer, Sider, Content } = Layout

const HomePage = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [authOpen, setAuthOpen] = useState(false)
    const [authType, setAuthType] = useState('signup')


    return (
        <Layout style={{ height: '100vh' }}>
            {modalOpen ? <NewSpriteModal setModalOpen={setModalOpen} /> : null}
            {authOpen ? <AuthModal setAuthOpen={setAuthOpen} history={props.history} authType={authType} /> : null}
            <Header>
                <Navbar currentPage={'home'} setAuthOpen={setAuthOpen} setAuthType={setAuthType} history={props.history} />
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