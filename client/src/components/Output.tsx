import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import React from "react";
import { RectangleEllipsis } from "lucide-react";

const Output: React.FC = () => {
    const finalCode = useSelector(
        (state: RootState) => state.compilerSlice.code
    );

    const combinedCode = `
        <html>
        <head>
            <style>
                ${finalCode.css}
            </style>
        </head>
        <body>
            ${finalCode.html}
            <script>
                ${finalCode.javascript}
            </script>
        </body>
        </html>
    `;

    return ( 
        <div className="p-1 bg-[#141414] text-white h-full">
            <div className="p-2 flex gap-1 items-center">
                {" "}
                <RectangleEllipsis size={16} /> Preview{" "}
            </div>
            <iframe
                className="rounded-lg"
                srcDoc={combinedCode}
                style={{ width: "100%", height: "500px", border: "none" }}
            />
        </div>
    );
};

export default Output;
