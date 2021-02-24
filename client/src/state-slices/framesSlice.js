import { createSlice } from '@reduxjs/toolkit'
import shortId from 'shortid'
const initialId = shortId.generate()
const id = shortId.generate()
const initialState = {
    id: id,
    name: '',
    currentFrameId: initialId,
    frames: [{ id: initialId, array: [] }],
    dimensions: { width: 0, height: 0 },
    email: ''
}

const framesSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
        initName: (state, action) => {
            state.name = action.payload
        },
        initEmail: (state, action) => {
            state.email = action.payload
        },
        initDimensions: (state, action) => {
            state.dimensions.width = action.payload.width
            state.dimensions.height = action.payload.height
        },
        addFrame: (state, action) => {
            state.frames.push({ id: action.payload.id, array: action.payload.array })
        },
        removeFrame: (state, action) => {
            let currentIndex = state.frames.findIndex(item => item.id === state.currentFrameId)
            state.frames = state.frames.filter(item => item.id !== action.payload)
            if (currentIndex <= 0) {
                currentIndex = 0
            }
            else {
                currentIndex -= 1
            }
            state.currentFrameId = state.frames[currentIndex].id
        },
        cloneFrame: (state, action) => {
            let index = state.frames.findIndex(item => item.id === action.payload.originalId)
            state.frames.splice(index, 0, { id: action.payload.newId, array: action.payload.array })
        },
        updateFrame: (state, action) => {
            state.frames.find(item => item.id === action.payload.id).array = action.payload.array
        },
        changeCurrentFrameId: (state, action) => {
            state.currentFrameId = action.payload
        },
        updateAllFrames: (state, action) => {
            state.frames = action.payload
        },
        resetFramesState: (state) => {
            const frameId = shortId.generate()
            state.id = shortId.generate()
            state.currentFrameId = frameId
            state.frames = [{ id: frameId, array: [] }]
            state.dimensions = { width: 0, height: 0 }
            state.email = ''
            state.name = ''
        },
        loadSprite: (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.currentFrameId = action.payload.currentFrameId
            state.frames = action.payload.frames
            state.dimensions = action.payload.dimensions
            state.email = action.payload.email
        }
    },
})

export const { initName, initEmail, initDimensions, addFrame, removeFrame, updateFrame, cloneFrame, changeCurrentFrameId, updateAllFrames, resetFramesState, loadSprite } = framesSlice.actions
export default framesSlice.reducer

export const selectId = state => state.frames.id
export const selectName = state => state.frames.name
export const selectFrames = state => state.frames.frames
export const selectCurrentFrameId = state => state.frames.currentFrameId
export const selectDimensions = state => state.frames.dimensions