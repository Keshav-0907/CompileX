import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import {
    loadLanguage,
    langs,
} from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateCSS, updateHTML, updateJS } from "@/store/slices/compilerSlice";

const Editor = () => {
    const dispatch = useDispatch()
    const currFile = useSelector(
        (state: RootState) => state.compilerSlice.fileToShow
    );

    const finalCode = useSelector((state: RootState)=>state.compilerSlice.code)
    console.log('currFile', currFile)
    
    const onChange = React.useCallback((val: string) => {
        if(currFile === 'html'){
            dispatch(updateHTML(val))
        }
        else if(currFile === 'css'){
            dispatch(updateCSS(val))
        }
        else if(currFile === 'javascript'){
            dispatch(updateJS(val))
        }
    }, [currFile, dispatch]);



    const extensions = React.useMemo(() => {
        if (langs[currFile as keyof typeof langs]) {
            return [loadLanguage(currFile as keyof typeof langs)!];
        }
        return [];
    }, [currFile]);

    console.log('finalCode[currFile]', finalCode[currFile])

    return (
        <CodeMirror
            value={finalCode[currFile]}
            height="85vh"
            extensions={extensions}
            onChange={onChange}
        />
    );
};

export default Editor;