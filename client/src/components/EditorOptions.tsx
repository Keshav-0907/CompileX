import { ArrowDownToLine, Share2 } from "lucide-react"; // Combining imports from the same package
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { changeFileToShow } from "@/store/slices/compilerSlice";

const EditorOptions = () => {
    const dispatch = useDispatch()
    const currFile = useSelector(
        (state: RootState) => state.compilerSlice.fileToShow
    );

    const state = useSelector((state)=>state)

    console.log('state', state)

    return (
        <div className="p-2 flex justify-between">
            <Tabs
                defaultValue={currFile}
                onValueChange={(value) => dispatch(changeFileToShow(value))}
                className="p-0"
            >
                <TabsList>
                    <TabsTrigger value="html">HTML</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="flex gap-5">
                <Button variant={"outline"} className="flex gap-1">
                    {" "}
                    <ArrowDownToLine size={16} /> Save{" "}
                </Button>
                <Button variant={"outline"} className="flex gap-1">
                    {" "}
                    <Share2 size={16} /> Share{" "}
                </Button>
            </div>
        </div>
    );
};

export default EditorOptions;
