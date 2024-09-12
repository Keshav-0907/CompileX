import { ArrowDownToLine, Share2 } from "lucide-react"; // Combining imports from the same package
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { changeFileToShow } from "@/store/slices/compilerSlice";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import ShareCodeModal from "./ShareCodeModal";

const EditorOptions = () => {
    const dispatch = useDispatch();

    const [isSaving, setIsSaving] = useState(false);
    const currFile = useSelector(
        (state: RootState) => state.compilerSlice.fileToShow
    );

    const state = useSelector((state: RootState) => state);
    console.log("state", state);

    const handleCodeSave = async () => {
        setIsSaving(true);
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/savecode`,
            {
                html: state.compilerSlice.code.html,
                css: state.compilerSlice.code.css,
                javascript: state.compilerSlice.code.javascript,
            }
        );
        if (res.status === 200) {
            toast.success("Code saved successfully");
        }
        // joi kk

        setIsSaving(false);
    };

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
                <Button
                    variant={"outline"}
                    className="flex gap-1"
                    onClick={handleCodeSave}
                >
                    {" "}
                    <ArrowDownToLine size={16} /> {isSaving ? "Saving" : "Save"}
                </Button>
                <Dialog>
                    <DialogTrigger>
                        <Button variant={"outline"} className="flex gap-1">
                            {" "}
                            <Share2 size={16} /> Share{" "}
                        </Button>
                    </DialogTrigger>
                    <ShareCodeModal/>
                </Dialog>
            </div>
        </div>
    );
};

export default EditorOptions;
