import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initName, initEmail, selectCurrentFrameId, updateFrame, initDimensions } from 'state-slices/framesSlice'

import makeStyles from '@material-ui/styles/makeStyles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


import { useCookies } from 'react-cookie'


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


const NewSpriteModal = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const [cookies] = useCookies()
    const currentFrameId = useSelector(selectCurrentFrameId)
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [dimensions, setDimensions] = useState(32)

    const openNewSprite = () => {
        let gridArray = new Array(dimensions * dimensions).fill({ r: 0, g: 0, b: 0, a: 0 })
        dispatch(initEmail(cookies.email))
        dispatch(initName(name))
        dispatch(initDimensions({ width: dimensions, height: dimensions }))
        dispatch(updateFrame({ id: currentFrameId, array: gridArray }))
        history.push('/editor')
    }

    const nameChange = (event) => {
        setName(event.target.value)
    }

    const sizeChange = (event) => {
        console.log(event.target.value)
        if (event.target.value > 64) {
            setDimensions(64)
        }
        else if (event.target.value < 1) {
            setDimensions(1)
        }
        else {
            setDimensions(event.target.value)
        }
    }

    return (
        <div className='modal-box'>
            <form noValidate className={classes.form}>
                <TextField required id="name" label="Name" value={name} onChange={nameChange} />
                <TextField required id="dimensions" label='Height/Width' value={dimensions} type='number' onChange={sizeChange}/>
                <Button onClick={openNewSprite}>Create Sprite</Button>
                <Button onClick={() => {  props.setModalOpen(false) }}>Close</Button>
            </form>
            {/* <Form
                layout='horizontal'
                form={form}
            >
                <Form.Item label='Name' name='name' initialValue='untitledSprite'>
                    <Input placeholder='Mario' />
                </Form.Item>
                <Form.Item label='Dimensions' name='width' initialValue={32}>
                    <InputNumber min={8} max={64} step={8} />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" onClick={openNewSprite}>Create Sprite</Button>
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => { props.setModalOpen(false) }}>Close Modal</Button>
                </Form.Item>
            </Form> */}
        </div>
    )
}
export default NewSpriteModal