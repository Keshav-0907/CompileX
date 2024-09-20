import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Share2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FaHtml5, FaCss3 } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals,
} from "unique-names-generator";

import { RootState } from "@/store/store";
import { changeFileToShow } from "@/store/slices/compilerSlice";
import AuthContext from "@/context/AuthContext";
import ShareCodeModal from "./ShareCodeModal";
import SaveModal from "./SaveModal";
import { useParams } from "react-router";

const EditorOptions = () => {
    const { id } = useParams();
    const codeId = id;

    const dispatch = useDispatch();
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const { user } = authContext;
    const [fileName, setFileName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const currFile = useSelector(
        (state: RootState) => state.compilerSlice.fileToShow
    );
    const codeState = useSelector(
        (state: RootState) => state.compilerSlice.code
    );

    useEffect(() => {
        const randomName = uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals],
        });
        setFileName(randomName);
    }, []);

    const handleCodeSave = async () => {
        if (!user) {
            toast.error("Please login to save the code");
            return;
        }
        setIsSaving(true);
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/savecode`,
            {
                name: fileName,
                codeData: {
                    html: codeState.html,
                    css: codeState.css,
                    javascript: codeState.javascript,
                },
                userID: user._id,
            }
        );

        if (res.status === 200) {
            toast.success(
                codeId ? "Code updated successfully" : "Code saved successfully"
            );
            if (!codeId) {
                navigate(`/compiler/${res.data.codeID}`);
            }
        }
        setIsSaving(false);
    };

    const handleUpdateCode = async () => {
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/updatecode`,
            {
                codeID: codeId,
                codeData: {
                    html: codeState.html,
                    css: codeState.css,
                    javascript: codeState.javascript,
                },
                userID: user._id,
            }
        );

        if (res.status === 200) {
            toast.success("Code updated successfully");
        }
    };

    return (
        <div className="p-2 flex justify-between bg-[#141414]">
            <Tabs
                defaultValue={currFile}
                onValueChange={(value) => dispatch(changeFileToShow(value))}
                className="p-0"
            >
                <TabsList>
                    <TabsTrigger value="html">
                        <FaHtml5 /> HTML
                    </TabsTrigger>
                    <TabsTrigger value="css">
                        <FaCss3 /> CSS
                    </TabsTrigger>
                    <TabsTrigger value="javascript">
                        <RiJavascriptFill /> JavaScript
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="flex gap-5 items-center">
                {codeId ? (
                    <Button
                        variant="outline"
                        onClick={handleUpdateCode}
                        className="flex gap-1"
                    >
                        Update
                    </Button>
                ) : (
                    <SaveModal
                        handleCodeSave={handleCodeSave}
                        fileName={fileName}
                        isSaving={isSaving}
                    />
                )}

                <Dialog>
                    <DialogTrigger>
                        <Button variant={"outline"} className="flex gap-1">
                            <Share2 size={16} /> Share
                        </Button>
                    </DialogTrigger>
                    <ShareCodeModal />
                </Dialog>
            </div>
        </div>
    );
};

export default EditorOptions;
