import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import editorToolsReducer from '../features/editor-slices/editorToolsSlice'
import colorPickerReducer from '../features/editor-slices/colorPickerSlice'
import framesReducer from '../features/editor-slices/framesSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    editorTools: editorToolsReducer,
    colorPicker: colorPickerReducer,
    frames: framesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
})