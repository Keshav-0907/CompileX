import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const ShareCodeModal = () => {
    const location = useLocation();
    const [isCopied, setIsCopied] = useState(false);
    const shareableLink = `${import.meta.env.VITE_CLIENT_URL}${location.pathname}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareableLink);
            toast.success("Link copied");
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset copy status after 2 seconds
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Share your code</DialogTitle>
                <DialogDescription className="flex gap-2">
                    <Input
                        placeholder="Shareable Link"
                        value={shareableLink}
                        readOnly
                    />
                    <Button
                        className="flex gap-2 text-xs"
                        onClick={handleCopy}
                    >
                        <Copy size={20} /> {isCopied ? "Copied!" : "Copy"}
                    </Button>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    );
};

export default ShareCodeModal;
