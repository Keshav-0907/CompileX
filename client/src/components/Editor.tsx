import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import {
    loadLanguage,
    langs,
} from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateCSS, updateHTML, updateJS } from "@/store/slices/compilerSlice";
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';



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

    const myGitHubTheme = createTheme({
        theme: 'dark',
        settings: {
          background: '#0d1117', // GitHub dark background
          backgroundImage: '',
          foreground: '#c9d1d9', // GitHub light gray text
          caret: '#58a6ff', // GitHub blue caret
          selection: '#6e768166', // Selection background with opacity
          selectionMatch: '#6e768166', // Match selection background
          lineHighlight: '#363b4280', // Line highlight with slight transparency
          gutterBackground: '#0d1117', // Same as the background
          gutterForeground: '#8b949e', // Slightly lighter gray for gutter
        },
        styles: [
          { tag: t.comment, color: '#8b949e' }, // GitHub comment color
          { tag: t.variableName, color: '#e06c75' }, // GitHub variables (like red)
          { tag: [t.string, t.special(t.brace)], color: '#a5d6ff' }, // Strings and braces (light blue)
          { tag: t.number, color: '#79c0ff' }, // Numbers (light blue)
          { tag: t.bool, color: '#d73a49' }, // Booleans (red)
          { tag: t.null, color: '#d73a49' }, // Null (red)
          { tag: t.keyword, color: '#f97583' }, // Keywords (pink/red)
          { tag: t.operator, color: '#79c0ff' }, // Operators (blue)
          { tag: t.className, color: '#ffa657' }, // Class names (orange)
          { tag: t.definition(t.typeName), color: '#ffa657' }, // Type definitions (orange)
          { tag: t.typeName, color: '#e06c75' }, // Type names (light red)
          { tag: t.angleBracket, color: '#c9d1d9' }, // Angle brackets (gray)
          { tag: t.tagName, color: '#7ee787' }, // Tag names (green)
          { tag: t.attributeName, color: '#d2a8ff' }, // Attribute names (purple)
        ],
      });
      



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
            theme={myGitHubTheme}
        />
    );
};

export default Editor;