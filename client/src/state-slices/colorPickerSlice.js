import { createSlice } from '@reduxjs/toolkit'

const initialState = { color: { r: 0, g: 0, b: 0, a: 1 } }

const colorPickerSlice = createSlice({
    name: 'colorPicker',
    initialState,
    reducers: {
        changeColor: (state, action) => {
            state.color = action.payload
        },
        resetColor: (state) => {
            state.color = { r: 0, g: 0, b: 0, a: 1 }
        }
    },
})

export const { changeColor, resetColor } = colorPickerSlice.actions
export default colorPickerSlice.reducer

export const selectColor = state => state.colorPicker.color