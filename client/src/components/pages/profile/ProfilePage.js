import { useEffect, useState } from 'react'
import { getSpritesByUser } from 'api/sprite'
import { useCookies } from 'react-cookie'


import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import makeStyles from '@material-ui/styles/makeStyles'


import Navbar from 'components/Navbar'
import NewSpriteModal from 'components/pages/home/NewSpriteModal'
import { getProfile } from 'api/auth'


const useStyles = makeStyles({
    root: {
        height: '80%',
        flexGrow: 1,
    },
    grid: {
        height: '100%'
    },
    sider: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'radial-gradient(#ffffff, #000000)',
    },
    mainContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

const ProfilePage = (props) => {
    const classes = useStyles()
    const [modalOpen, setModalOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true)
    const [sprites, setSprites] = useState([])
    const [cookies] = useCookies()

    useEffect(() => {
        if (!cookies.token){
            props.history.push('/')
        }
    })
    
    useEffect(() => {
        getProfile(cookies.token)
            .then(user => setUsername(user.email))
            .catch(error => {
                console.log(error)
            })
        getSpritesByUser(cookies.token)
            .then(response => {
                setSprites(response.data.map(sprite => ({ name: sprite.name, id: sprite.id })))
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [cookies.token])

    const openSprite = (id) => {
        const state = {
            id: id
        }
        props.history.push('/editor', state)
    }

    return (

        <Container maxWidth='xl' className={classes.root} >
            {modalOpen ? <NewSpriteModal setModalOpen={setModalOpen} /> : null}
            <Navbar currentPage={'profile'} history={props.history} />
            <Grid
                className={classes.grid}
                container
                justify='space-between'
            >
                <Grid item sm className={classes.sider}>
                </Grid>
                <Grid item md={8} className={classes.mainContent}>
                    <Button onClick={() => setModalOpen(true)}>New Sprite</Button>
                    <div className='sprite-card-grid'>
                        {loading && (
                            <Box>
                                <CircularProgress />
                            </Box>
                        )}
                        {sprites.map(sprite => {
                            return (
                                <div className='sprite-card' key={sprite.id}>
                                    <h2>{sprite.name}</h2>
                                    <button onClick={() => openSprite(sprite.id)}>Open</button>
                                </div>
                            )
                        })}
                    </div>
                </Grid>
                <Grid item sm className={classes.sider}>
                    <h1>{username}</h1>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProfilePage