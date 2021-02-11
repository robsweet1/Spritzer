import { configureStore } from '@reduxjs/toolkit'
import editorToolsReducer from 'editor-slices/editorToolsSlice'
import colorPickerReducer from 'editor-slices/colorPickerSlice'
import framesReducer from 'editor-slices/framesSlice'
import authReducer from 'auth-slices/authSlice'

export default configureStore({
  reducer: {
    editorTools: editorToolsReducer,
    colorPicker: colorPickerReducer,
    frames: framesReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
})