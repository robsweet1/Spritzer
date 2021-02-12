import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeTool } from 'state-slices/editorToolsSlice'
import Menu from 'antd/es/menu'
import { BiPencil, BiEraser } from 'react-icons/bi'
import { IoEyedropSharp } from 'react-icons/io5'
import { VscMirror } from 'react-icons/vsc'
import DrawSizeChanger from 'components/pages/editor/DrawSizeChanger'

const EditorTools = () => {
    const [currentTool, setCurrentTool] = useState('')
    const dispatch = useDispatch()

    const handleClick = e => {
        dispatch(changeTool(e.key))
        setCurrentTool(e.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={currentTool} mode='horizontal'>
            <Menu.Item className='menu-tool-container' key='draw'>
                <BiPencil size='lg' className='menu-tool-icon' />
            </Menu.Item>
            <Menu.Item className='menu-tool-container' key='erase'>
                <BiEraser size='lg' className='menu-tool-icon' />
            </Menu.Item>
            <Menu.Item className='menu-tool-container' key='pick'>
                <IoEyedropSharp size='lg' className='menu-tool-icon' />
            </Menu.Item>
            <Menu.Item className='menu-tool-container' key='mirror'>
                <VscMirror size='lg' className='menu-tool-icon' />
            </Menu.Item>
            <Menu.SubMenu>
                <DrawSizeChanger />
            </Menu.SubMenu>
        </Menu>
    )
}

export default EditorTools