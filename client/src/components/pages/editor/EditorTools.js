import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeTool } from 'state-slices/editorToolsSlice'

import Toolbar from '@material-ui/core/Toolbar'
import Radio from '@material-ui/core/Radio'
import Tooltip from '@material-ui/core/Tooltip'
import Create from '@material-ui/icons/Create'
import ColorizeIcon from '@material-ui/icons/Colorize'

import { BiEraser } from 'react-icons/bi'
import { VscMirror } from 'react-icons/vsc'


const EditorTools = () => {
    const [activeTool, setActiveTool] = useState('')
    const dispatch = useDispatch()

    const setTool = (tool) => {
        dispatch(changeTool(tool))
        setActiveTool(tool)
    }

    return (
        <Toolbar style={{ borderBottom: 'black solid 2px', marginBottom: '5px' }}>
            <Tooltip title='Draw'>
                <Radio
                    checked={activeTool === 'draw'}
                    checkedIcon={<Create />}
                    onChange={() => setTool('draw')}
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                    ac
                    icon={<Create />}
                />
            </Tooltip>
            <Tooltip title='Erase'>
                <Radio
                    checked={activeTool === 'erase'}
                    checkedIcon={<BiEraser />}
                    onChange={() => setTool('erase')}
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                    ac
                    icon={<BiEraser />}
                />
            </Tooltip>
            <Tooltip title='Select Color'>
                <Radio
                    checked={activeTool === 'pick'}
                    checkedIcon={<ColorizeIcon />}
                    onChange={() => setTool('pick')}
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                    ac
                    icon={<ColorizeIcon />}
                />
            </Tooltip>
            <Tooltip title='Mirror'>
                <Radio
                    checked={activeTool === 'mirror'}
                    checkedIcon={<VscMirror />}
                    onChange={() => setTool('mirror')}
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                    ac
                    icon={<VscMirror />}
                />
            </Tooltip>
        </Toolbar>
    )
}

export default EditorTools