import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { saveSprite } from 'api/sprite'
import { selectFrames, selectName, selectId, selectDimensions } from 'state-slices/framesSlice'


const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginBottom: '10px'
    },
    title: {
        flexGrow: 10,
    },
})


const Navbar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElProfile, setAnchorElProfile] = useState(null)
    const classes = useStyles()
    const frames = useSelector(selectFrames)
    const name = useSelector(selectName)
    const id = useSelector(selectId)
    const dimensions = useSelector(selectDimensions)
    const [cookies, setCookie, removeCookie] = useCookies()

    const openRouteMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    
    const openProfileMenu = (event) => {
        setAnchorElProfile(event.currentTarget)
    }

    const openAuthMenu = (type) => {
        props.setAuthType(type)
        props.setAuthOpen(true)
    }

    const handleLogout = () => {
        removeCookie('token')
        props.history.push('/')
    }

    const handleSave = () => {
        saveSprite(id, name, frames, dimensions, cookies.email, cookies.token)
            .then(result => {
                props.setSaved(true)
                console.log(result)
            })
            .catch(error => console.log(error))
    }

    const goToRoute = (route) => {
        props.history.push(route)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const closeProfileMenu = () => {
        setAnchorElProfile(null)
    }

    return (
        <div className={classes.root}>
            <AppBar position='relative'>
                <Toolbar>
                    <IconButton 
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        aria-controls="route-menu"
                        aria-haspopup="true"
                        onClick={openRouteMenu}
                        >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id='route-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => goToRoute('/')}>Home</MenuItem>
                        <MenuItem onClick={() => goToRoute('/profile')}>Profile</MenuItem>
                    </Menu>
                    <Typography variant="h6" className={classes.title}>
                        SPRITZER
                    </Typography>
                    {props.saveButton && <Button variant="contained" color='default' onClick={() => handleSave()}>Save Sprite</Button>}
                    {!cookies.token && (
                        <div>
                            <Button variant="contained" color="primary" onClick={() => openAuthMenu('login')}>Log In</Button>
                            <Button variant="contained" color="primary" onClick={() => openAuthMenu('signup')}>Sign Up</Button>
                        </div>
                    )}
                    {cookies.token && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="profile-menu"
                                aria-haspopup="true"
                                onClick={openProfileMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                    id='profile-menu'
                                    anchorEl={anchorElProfile}
                                    keepMounted
                                    open={Boolean(anchorElProfile)}
                                    onClose={closeProfileMenu}
                            >
                                <MenuItem onClick={() => goToRoute('/profile')}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {/* <Toolbar /> */}
        </div>
    )
}

export default Navbar