import Editor from "@/components/Editor";
import EditorOptions from "@/components/EditorOptions";
import Output from "@/components/Output";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

const Compiler = () => {
    return (
        <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel className="h-screen">
              <EditorOptions/>
              <Editor/>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
                <Output/>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default Compiler;
