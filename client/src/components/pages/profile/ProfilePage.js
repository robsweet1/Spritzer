import { useEffect, useState } from 'react'
import { getSpriteById, getSpritesByUser } from 'api/sprite'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { loadSprite } from 'state-slices/framesSlice'
import Button from 'antd/es/button'
import Layout from 'antd/es/layout'
import Navbar from 'components/Navbar'
import NewSpriteModal from 'components/pages/home/NewSpriteModal'
import { getProfile } from 'api/auth'


const { Header, Footer, Sider, Content } = Layout

const ProfilePage = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true)
    const [sprites, setSprites] = useState([])
    const [cookies] = useCookies()
    const dispatch = useDispatch()

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
        getSpriteById(id, cookies.token)
            .then(response => {
                console.log(response)
                const payload = {
                    id: response.data.id,
                    name: response.data.name,
                    currentFrameId: response.data.frames[0].id,
                    frames: response.data.frames,
                    dimensions: response.data.dimensions,
                    email: response.data.email
                }
                dispatch(loadSprite(payload))
                props.history.push('/editor')
            })
    }

    return (
        <Layout style={{ height: '100vh' }}>
            {modalOpen ? <NewSpriteModal setModalOpen={setModalOpen} /> : null}
            <Header>
                <Navbar currentPage={'profile'} history={props.history} />
            </Header>
            <Layout>
                <Sider width={250} >
                </Sider>
                <Layout>
                    <Content className='main-content' >
                        <Button onClick={() => setModalOpen(true)}>New Sprite</Button>
                        <div className='sprite-card-grid'>
                            {loading && <h2>Loading...</h2>}
                            {sprites.map(sprite => {
                                return (
                                    <div className='sprite-card' key={sprite.id}>
                                        <h2>{sprite.name}</h2>
                                        <button onClick={() => openSprite(sprite.id)}>Open</button>
                                    </div>
                                )
                            })}
                        </div>
                    </Content>
                </Layout>
                <Sider width={250}>
                    <h1>{username}</h1>
                </Sider>
            </Layout>
            <Footer></Footer>
        </Layout>
    )
}

export default ProfilePage