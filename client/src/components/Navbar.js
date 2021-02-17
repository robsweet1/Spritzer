import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import Button from 'antd/es/button'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

const Navbar = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies()

    useEffect(() => {
        console.log(cookies)
    })

    const LeftMenu = () => {
        return  (
            <Menu className='nav' selectedKeys={props.currentPage} mode='horizontal'>
                <Menu.Item key='home'>
                    <Link to='/'>
                        Home
                    </Link>
                </Menu.Item>
            </Menu>
        )
    }

    const RightMenu = () => {
        return(
            <Menu className='nav' mode='horizontal'>
                <Menu.Item key='auth'>
                    {cookies.token && <Button onClick={() => handleLogout()}>Log Out</Button>}
                    {!cookies.token && <Button onClick={() => openMenu('login')}>Log In</Button>}
                </Menu.Item>
                <Menu.Item key='signup'>
                    {!cookies.token && <Button onClick={() => openMenu('signup')}>Sign Up</Button>}
                </Menu.Item>
            </Menu>
        )
    }

    const openMenu = (type) => {
        props.setAuthType(type)
        props.setAuthOpen(true)
    }

    const handleLogout = () => {
        removeCookie('token')
        props.history.push('/')
    }

    return (
        <nav className='nav'>
            <LeftMenu />
            <RightMenu />
        </nav>
    )
}

export default Navbar