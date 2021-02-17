import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useBeforeunload } from 'react-beforeunload'
import { Prompt } from 'react-router'
import Layout from 'antd/es/layout'
import Typography from 'antd/es/typography'
import Navbar from 'components/Navbar'
import ColorPicker from 'components/pages/editor/ColorPicker'
import EditorGrid from 'components/pages/editor/EditorGrid'
import EditorTools from 'components/pages/editor/EditorTools'
import PreviewLoop from 'components/pages/editor/PreviewLoop'
import Frames from 'components/pages/editor/Frames'
import DrawSizeChanger from 'components/pages/editor/DrawSizeChanger'
import { selectAuth } from 'state-slices/authSlice'


const { Title } = Typography
const { Header, Footer, Sider, Content } = Layout

const EditorPage = (props) => {
    const auth = useSelector(selectAuth)

    useEffect(() => {
        if (!auth) {
            props.history.push('/')
        }
    })

    useBeforeunload((event) => event.preventDefault())

    return (
        <>
            <Prompt
                when={true}
                message='You have unsaved changes, are you sure you want to leave?'
            />
            <Layout style={{ height: '100vh' }}>
                <Header>
                    <Navbar currentPage={'editor'} history={props.history}/>
                </Header>
                <Layout>
                    <Sider width={250} >
                        <ColorPicker />
                        <PreviewLoop
                            height={props.location.state.width}
                            width={props.location.state.width}
                        />
                        <DrawSizeChanger />
                    </Sider>
                    <Layout>
                        <Content className='main-content' >
                            <EditorTools />
                            <EditorGrid
                                height={props.location.state.width}
                                width={props.location.state.width}
                                name={props.location.state.name}
                            />
                        </Content>
                    </Layout>
                    <Sider width={250}>
                        <Title level={4} style={{ marginTop: '15px' }}>
                            Frame Sequence
                    </Title>
                        <Frames
                            height={props.location.state.width}
                            width={props.location.state.width}
                        />
                    </Sider>
                </Layout>
                <Footer></Footer>
            </Layout>
        </>
    )
}

export default EditorPage