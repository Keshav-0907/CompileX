import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowDownToLine } from "lucide-react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-hot-toast";



const SaveModal = ({ handleCodeSave, fileName,isSaving }) => {
    const [open, setOpen] = useState(false);

    const authContext = useContext(AuthContext);
    const { user } = authContext;

    const handleSave = () => {
        if (!user) {
            toast.error("Please login to save the code");
            return;
        }
        handleCodeSave();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        {" "}
                        <ArrowDownToLine size={16} /> Save
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Pick a cool name for your project
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                    <div className="">
                        <Input id="name" value={fileName} className="w-full" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>
                        {isSaving ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SaveModal;
