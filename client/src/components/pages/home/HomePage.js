import { useState } from 'react'
import Button from 'antd/es/button'
import Layout from 'antd/es/layout'
import Navbar from 'components/Navbar'
import NewSpriteModal from 'components/pages/home/NewSpriteModal'

const { Header, Footer, Sider, Content } = Layout

const HomePage = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Layout style={{ height: '100vh' }}>
            {modalOpen ? <NewSpriteModal setModalOpen={setModalOpen} /> : null}
            <Header>
                <Navbar currentPage={'home'}/>
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