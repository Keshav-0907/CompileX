import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { langs, LanguageName } from "@uiw/codemirror-extensions-langs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateCSS, updateHTML, updateJS } from "@/store/slices/compilerSlice";
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

type FileType = 'html' | 'css' | 'javascript';

interface EditorProps {
  finalCode: Record<FileType, string>;
  currFile: FileType;
}

const Editor: React.FC<EditorProps> = () => {
  const dispatch = useDispatch();
  const currFile = useSelector((state: RootState) => state.compilerSlice.fileToShow) as FileType;
  const finalCode = useSelector((state: RootState) => state.compilerSlice.code);

  const onChange = React.useCallback((val: string) => {
    switch (currFile) {
      case 'html':
        dispatch(updateHTML(val));
        break;
      case 'css':
        dispatch(updateCSS(val));
        break;
      case 'javascript':
        dispatch(updateJS(val));
        break;
    }
  }, [currFile, dispatch]);

  const myGitHubTheme = createTheme({
    theme: 'dark',
    settings: {
    background: '#0d1117',
    foreground: '#c9d1d9',
    caret: '#58a6ff',
    selection: '#6e768166',
    lineHighlight: '#363b4280',
    gutterBackground: '#0d1117',
    gutterForeground: '#8b949e',
     },
    styles: [
     { tag: t.comment, color: '#8b949e' },
     { tag: t.variableName, color: '#e06c75' },
     { tag: [t.string, t.special(t.brace)], color: '#a5d6ff' },
     { tag: t.number, color: '#79c0ff' },
     { tag: t.bool, color: '#d73a49' },
     { tag: t.null, color: '#d73a49' },
     { tag: t.keyword, color: '#f97583' },
     { tag: t.operator, color: '#79c0ff' },
     { tag: t.className, color: '#ffa657' },
     { tag: t.definition(t.typeName), color: '#ffa657' },
     { tag: t.typeName, color: '#e06c75' },
     { tag: t.angleBracket, color: '#c9d1d9' },
     { tag: t.tagName, color: '#7ee787' },
     { tag: t.attributeName, color: '#d2a8ff' },
     ],
     });

  const extensions = React.useMemo(() => {
    const langFunction = langs[currFile as LanguageName];
    return langFunction ? [langFunction()] : [];
  }, [currFile]);

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