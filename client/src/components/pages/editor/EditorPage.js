import Layout from 'antd/es/layout'
import Navbar from '../../Navbar'
import ColorPicker from './ColorPicker'
import EditorGrid from './EditorGrid'
import EditorTools from './EditorTools'
import PreviewLoop from './PreviewLoop'
import Frames from './Frames'
import DrawSizeChanger from './DrawSizeChanger'
import Typography from 'antd/es/typography'

const { Title } = Typography 
const { Header, Footer, Sider, Content } = Layout

const EditorPage = () => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Header>
                <Navbar />
            </Header>
            <Layout>
                <Sider width={250} >
                    <ColorPicker />
                    <PreviewLoop />
                    <DrawSizeChanger />
                </Sider>
                <Layout>
                    <Content className='main-content' >
                        <EditorTools />
                        <EditorGrid />
                    </Content>
                </Layout>
                <Sider width={250}>
                    <Title level={4} style={{marginTop: '15px'}}>
                        Frame Sequence
                    </Title>
                    <Frames />
                </Sider>
            </Layout>
            <Footer></Footer>
        </Layout>
    )
}

export default EditorPage