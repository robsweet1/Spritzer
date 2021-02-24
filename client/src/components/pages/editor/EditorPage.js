import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
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

import { useDispatch} from 'react-redux'
import { resetTool} from 'state-slices/editorToolsSlice'
import { resetColor } from 'state-slices/colorPickerSlice'
import { resetFramesState } from 'state-slices/framesSlice'

const { Title } = Typography
const { Header, Footer, Sider, Content } = Layout

const EditorPage = (props) => {
    const dispatch = useDispatch()
    const [saved, setSaved] = useState(false)
    const [cookies] = useCookies(['token'])

    useEffect(() => {
        if (!cookies.token) {
            props.history.push('/')
        }
    })


    useEffect(() => {
        return () => {
            dispatch(resetFramesState())
            dispatch(resetTool())
            dispatch(resetColor())
        }
    }, [])

    useBeforeunload((event) => event.preventDefault())

    return (
        <>
            <Prompt
                when={!saved}
                message='You have unsaved changes, are you sure you want to leave?'
            />
            <Layout style={{ height: '100vh' }}>
                <Header>
                    <Navbar currentPage={'editor'} history={props.history} saveButton={true} setSaved={setSaved}/>
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
                            <EditorGrid setSaved={setSaved} />
                        </Content>
                    </Layout>
                    <Sider width={250}>
                        <Title level={4} style={{ marginTop: '15px' }}>
                            Frame Sequence
                        </Title>
                        <Frames />
                    </Sider>
                </Layout>
                <Footer></Footer>
            </Layout>
        </>
    )
}

export default EditorPage