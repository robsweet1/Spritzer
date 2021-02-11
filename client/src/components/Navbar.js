import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import Button from 'antd/es/button'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, changeAuth } from 'state-slices/authSlice'

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

    const RightMenu = () => {
        return(
            <Menu className='nav' mode='horizontal'>
                <Menu.Item key='auth'>
                    {auth && <Button onClick={() => dispatch(changeAuth(false))}>Log Out</Button>}
                    {!auth && <Button onClick={() => dispatch(changeAuth(true))}>Log In</Button>}
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