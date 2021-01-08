import { createSlice, current } from '@reduxjs/toolkit'
import shortId from 'shortid'
const initialId = shortId.generate()
const initialState = {currentFrameId: initialId, frames: [{id: initialId, array: []}]}

const framesSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
        addFrame: (state, action) => {
            state.frames.push({id: action.payload.id, array: action.payload.array})
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
            state.frames.splice(index, 0, {id: action.payload.newId, array: action.payload.array})
            console.log(current(state))
        },
        updateFrame: (state, action) => {
            console.log(action.payload)
            state.frames.find(item => item.id === action.payload.id).array = action.payload.array
        },
        changeCurrentFrameId: (state, action) => {
            state.currentFrameId = action.payload
        },
        updateAllFrames: (state, action) => {
            state.frames = action.payload
        }
    },
})

export const { addFrame, removeFrame, updateFrame, cloneFrame, changeCurrentFrameId, updateAllFrames } = framesSlice.actions
export default framesSlice.reducer

export const selectFrames = state => state.frames.frames
export const selectCurrentFrameId = state => state.frames.currentFrameId