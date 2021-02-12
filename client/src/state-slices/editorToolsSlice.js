import { createSlice } from '@reduxjs/toolkit'

const initialState = { tool: '', drawSize: 1 }

const editorToolsSlice = createSlice({
    name: 'editorTools',
    initialState,
    reducers: {
        changeTool: (state, action) => {
            state.tool = action.payload
        },
        changeDrawSize: (state, action) => {
            state.drawSize = action.payload
        }
    },
})

export const { changeTool, changeDrawSize } = editorToolsSlice.actions
export default editorToolsSlice.reducer

export const selectEditorTool = state => state.editorTools.tool
export const selectDrawSize = state => state.editorTools.drawSize