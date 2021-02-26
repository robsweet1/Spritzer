import { useState } from 'react'
import { login, signup } from 'api/auth'
import { useCookies } from 'react-cookie'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import makeStyles from '@material-ui/styles/makeStyles'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    tabs: {
        backgroundColor: 'black',
        color: 'white',
    },
    panel: {
        backgroundColor: 'white',
        color: 'black',
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    }
})



const AuthModal = (props) => {
    const classes = useStyles()
    const [value, setValue] = useState(0)
    const [cookies, setCookie] = useCookies(['token', 'loggedin'])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleAuth = async (authType) => {
        if (authType === 'login') {
            login(email, password)
                .then(data => {
                    console.log('hit then')
                    console.log(data)
                    setCookie('token', data.token, { sameSite: true, path: '/' })
                    setCookie('email', email, { sameSite: true, path: '/' })
                    props.setAuthOpen(false)
                    props.history.push('/profile')
                })
                .catch(error => {
                    console.log('hit error')
                    console.log(error)
                })
        }
        else if (authType === 'signup') {
            signup(email, password)
                .then(data => console.log(data))
                .catch(error => console.log(error))
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const emailChange = (event) => {
        setEmail(event.target.value)
    }

    const passwordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div className='modal-box'>
            <Box>
                <Toolbar className={classes.tabs}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Log In" {...a11yProps(0)} />
                        <Tab label="Sign Up" {...a11yProps(1)} />
                    </Tabs>
                </Toolbar>
                <TabPanel value={value} index={0} className={classes.panel} >
                    <form noValidate className={classes.form}>
                        <TextField required id="email" label="email" defaultValue={email} onChange={emailChange} />
                        <TextField required id="password" label='password' type='password' defaultValue={password} onChange={passwordChange}/>
                        <Button onClick={() => handleAuth('login')}>Log In</Button>
                        <Button onClick={() => { props.setAuthOpen(false) }}>Close</Button>
                    </form>
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.panel}>
                    <form noValidate className={classes.form}>
                        <TextField required id="email" label="email" defaultValue={email} onChange={emailChange} />
                        <TextField required id="password" label='password' type='password' defaultValue={password} onChange={passwordChange}/>
                        <Button onClick={() => handleAuth('signup')}>Sign Up</Button>
                        <Button onClick={() => { props.setAuthOpen(false) }}>Close</Button>
                    </form>
                </TabPanel>
            </Box>
        </div>
    )
}

export default AuthModal