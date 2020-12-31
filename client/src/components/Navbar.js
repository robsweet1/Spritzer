import { Menu } from 'antd'
import { useState } from 'react'

const Navbar = () => {
    const [current, setCurrent] = useState('home')

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
            <Menu.Item key='home' icon={null}>
                Home
            </Menu.Item>
            <Menu.Item key='browse'>
                Browse
            </Menu.Item>
        </Menu>
    )
}

export default Navbar