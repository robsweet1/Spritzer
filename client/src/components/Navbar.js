import { Menu } from 'antd'
import { useState } from 'react'

const Navbar = () => {
    const [current, setCurrent] = useState('home')

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key)
    }

    return (
        <Menu className='nav' onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
            <Menu.Item key='home'>
                Home
            </Menu.Item>
            <Menu.Item key='browse'>
                Browse
            </Menu.Item>
        </Menu>
    )
}

export default Navbar