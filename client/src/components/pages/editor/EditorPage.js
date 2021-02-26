import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useBeforeunload } from 'react-beforeunload'
import { Prompt } from 'react-router'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/styles/makeStyles'
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



const useStyles = makeStyles({
    root: {
        height: '80%',
        flexGrow: 1,
    },
    grid: {
        height: '100%'
    },
    sider: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'radial-gradient(#ffffff, #000000)',

    },
    editorGrid: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})


const EditorPage = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles()
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
            <Container maxWidth='xl' className={classes.root} >
                <Navbar currentPage='editor' history={props.history} saveButton={true} setSaved={setSaved} />
                <Grid
                    className={classes.grid}
                    container
                    justify='space-between'
                >
                    <Grid item sm className={classes.sider}>
                        <ColorPicker />
                        <PreviewLoop />
                        <DrawSizeChanger />
                    </Grid>
                    <Grid item md={8} className={classes.editorGrid} >
                        <EditorTools />
                        {props.location.state && <EditorGrid setSaved={setSaved} mapId={props.location.state.id} />}
                        {!props.location.state && <EditorGrid setSaved={setSaved} mapId={undefined} />}
                    </Grid>
                    <Grid item sm className={classes.sider}>
                        <Frames />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default EditorPage