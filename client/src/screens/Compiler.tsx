import Editor from "@/components/Editor";
import EditorOptions from "@/components/EditorOptions";
import Output from "@/components/Output";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateHTML, updateCSS, updateJS } from "@/store/slices/compilerSlice";

const Compiler = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const getCode = async () => {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/getcode`,
                    {
                        id,
                    }
                );
                if(res.status === 200) {
                    const { html, css, javascript } = res.data.data.codeData;
                    dispatch(updateHTML(html));
                    dispatch(updateCSS(css));
                    dispatch(updateJS(javascript));
                }
            };
            getCode();
        }
    }, [dispatch, id]);
    return (
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-71px)]">
            <ResizablePanel className="">
                <EditorOptions />
                <Editor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="">
                <Output />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default Compiler;
