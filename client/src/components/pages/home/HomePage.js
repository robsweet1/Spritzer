import { useState } from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/styles/makeStyles'

import Navbar from 'components/Navbar'
import NewSpriteModal from 'components/pages/home/NewSpriteModal'
import AuthModal from 'components/pages/home/AuthModal'

// const { Header, Footer, Sider, Content } = Layout

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
        // background: 'radial-gradient(#ffffff, #000000)',
    },
    left: {
        borderRight: 'solid #9e9e9e 1px'
    },
    right: {
        borderLeft: 'solid #9e9e9e 1px'
    },
    mainContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

const HomePage = (props) => {
    const classes = useStyles()
    const [modalOpen, setModalOpen] = useState(false)
    const [authOpen, setAuthOpen] = useState(false)
    const [authType, setAuthType] = useState('signup')


    return (

        <Container maxWidth='xl' className={classes.root} >
            {modalOpen ? <NewSpriteModal setModalOpen={setModalOpen} /> : null}
            {authOpen ? <AuthModal setAuthOpen={setAuthOpen} history={props.history} authType={authType} /> : null}
            <Navbar currentPage={'home'} setAuthOpen={setAuthOpen} setAuthType={setAuthType} history={props.history} />
            <Grid
                className={classes.grid}
                container
                justify='space-between'
            >
                <Grid item sm className={classes.sider, classes.left}>
                </Grid>
                <Grid item md={8} className={classes.mainContent}>
                    <Button onClick={() => setModalOpen(true)}>New Sprite</Button>
                </Grid>
                <Grid item sm className={classes.sider, classes.right}>
                </Grid>
            </Grid>
        </Container>
        // <Layout style={{ height: '100vh' }}>
        //     {modalOpen ? <NewSpriteModal setModalOpen={setModalOpen} /> : null}
        //     {authOpen ? <AuthModal setAuthOpen={setAuthOpen} history={props.history} authType={authType} /> : null}
        //     <Header>
        //         <Navbar currentPage={'home'} setAuthOpen={setAuthOpen} setAuthType={setAuthType} history={props.history} />
        //     </Header>
        //     <Layout>
        //         <Sider width={250} >
        //         </Sider>
        //         <Layout>
        //             <Content className='main-content' >
        //                 <Button onClick={() => setModalOpen(true)}>New Sprite</Button>
        //             </Content>
        //         </Layout>
        //         <Sider width={250}>
        //         </Sider>
        //     </Layout>
        //     <Footer></Footer>
        // </Layout>
    )
}

export default HomePage