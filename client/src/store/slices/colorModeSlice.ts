import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ColorModeState {
    mode: "light" | "dark";
}

const initialState: ColorModeState = {
    mode: "light",
};

const colorModeSlice = createSlice({
    name: "colorMode",
    initialState,
    reducers: {
        toggleColorMode: (state, action: PayloadAction<"light" | "dark">) => {
            state.mode = action.payload;
        },
    },
});

export const { toggleColorMode } = colorModeSlice.actions;
export default colorModeSlice.reducer;