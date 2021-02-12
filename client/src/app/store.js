import { configureStore } from '@reduxjs/toolkit'
import editorToolsReducer from 'state-slices/editorToolsSlice'
import colorPickerReducer from 'state-slices/colorPickerSlice'
import framesReducer from 'state-slices/framesSlice'
import authReducer from 'state-slices/authSlice'

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