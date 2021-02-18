import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import Button from 'antd/es/button'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { selectFrames, selectName, selectId } from 'state-slices/framesSlice'
import axios from 'axios'

const Navbar = (props) => {
    const frames = useSelector(selectFrames)
    const name = useSelector(selectName)
    const id = useSelector(selectId)
    const [cookies, setCookie, removeCookie] = useCookies()
    const LeftMenu = () => {
        return  (
            <Menu className='nav' selectedKeys={props.currentPage} mode='horizontal'>
                <Menu.Item key='home'>
                    <Link to='/'>
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key='Save'>
                    {props.saveButton && <Button onClick={() => saveSprite()}>Save Sprite</Button>}
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

    const saveSprite = () => {
        console.log(id)
        axios.post(`http://localhost:5000/api/secure/sprite?secret_token=${cookies.token}`, {
            id: id,
            name: name,
            frames: frames,
            email: cookies.email
        })
            .then(response => {
                props.setSaved(true)
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <nav className='nav'>
            <LeftMenu />
            <RightMenu />
        </nav>
    )
}

export default Navbar