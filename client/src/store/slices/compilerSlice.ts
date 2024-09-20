import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface InitialStateTypes {
    code: {
        html: string;
        css: string;
        javascript: string;
    };
    fileToShow: string;
}

// Set the initial state
const initialState: InitialStateTypes = {
    code: {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Welcome to CompilX</title>
</head>
<body>
    <button id="colorButton">Change Background Color</button>
</body>
</html>`,
        css: `body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}`,
        javascript: `const button = document.getElementById('colorButton');

button.addEventListener('click', () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
});`,
    },
    fileToShow: "html",
};

// Create the slice
const compilerSlice = createSlice({
    name: "compiler",
    initialState,
    reducers: {
        // Reducer to change the file being shown
        changeFileToShow: (state, action: PayloadAction<string>) => {
            state.fileToShow = action.payload;
        },
        // Reducer to update HTML content
        updateHTML: (state, action: PayloadAction<string>) => {
            state.code.html = action.payload;
        },
        // Reducer to update CSS content
        updateCSS: (state, action: PayloadAction<string>) => {
            state.code.css = action.payload;
        },
        // Reducer to update JavaScript content
        updateJS: (state, action: PayloadAction<string>) => {
            state.code.javascript = action.payload;
        },
    },
});

// Export actions and reducer
export default compilerSlice.reducer;
export const { changeFileToShow, updateHTML, updateCSS, updateJS } =
    compilerSlice.actions;
