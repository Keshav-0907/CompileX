import { configureStore } from '@reduxjs/toolkit'
import  compilerSlice from './slices/compilerSlice'
import colorModeSlice from './slices/colorModeSlice'

export const store = configureStore({
    reducer:{
        compilerSlice,
        colorModeSlice
    }
})

export type RootState = ReturnType<typeof store.getState>