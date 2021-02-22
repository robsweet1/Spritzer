import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import Button from 'antd/es/button'
import { saveSprite } from 'api/sprite'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { selectFrames, selectName, selectId } from 'state-slices/framesSlice'

const Navbar = (props) => {
    const frames = useSelector(selectFrames)
    const name = useSelector(selectName)
    const id = useSelector(selectId)
    const [cookies, setCookie, removeCookie] = useCookies()
    const LeftMenu = () => {
        return (
            <Menu className='nav' selectedKeys={props.currentPage} mode='horizontal'>
                <Menu.Item key='home'>
                    <Link to='/'>
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key='Save'>
                    {props.saveButton && <Button onClick={() => handleSave()}>Save Sprite</Button>}
                </Menu.Item>
            </Menu>
        )
    }

    const RightMenu = () => {
        return (
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

    const handleSave = () => {
        saveSprite(id, name, frames, cookies.email, cookies.token)
            .then(result => {
                props.setSaved(true)
                console.log(result)
            })
            .catch(error => console.log(error))
        // axios.post('http://localhost:5000/api/secure/sprite',
        //     {
        //         id: id,
        //         name: name,
        //         frames: frames,
        //         email: cookies.email
        //     },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${cookies.token}`
        //         }
        //     })
        //     .then(response => {
        //         props.setSaved(true)
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    return (
        <nav className='nav'>
            <LeftMenu />
            <RightMenu />
        </nav>
    )
}

export default Navbar