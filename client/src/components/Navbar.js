import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import Button from 'antd/es/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, changeAuth } from 'state-slices/authSlice'
import { useEffect } from 'react'

const Navbar = (props) => {
    const dispatch = useDispatch()
    const auth = useSelector(selectAuth)

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

    useEffect(() => {
        console.log(auth)
    })

    const RightMenu = () => {
        return(
            <Menu className='nav' mode='horizontal'>
                <Menu.Item key='auth'>
                    {auth && <Button onClick={() => dispatch(changeAuth(false))}>Log Out</Button>}
                    {!auth && <Button onClick={() => props.setAuthOpen(true)}>Log In</Button>}
                </Menu.Item>
                <Menu.Item key='signup'>
                    {!auth && <Button onClick={() => {props.setAuthOpen(true)}}>Sign Up</Button>}
                </Menu.Item>
            </Menu>
        )
    }

    return (
        <nav className='nav'>
            <LeftMenu />
            <RightMenu />
        </nav>
    )
}

export default Navbar