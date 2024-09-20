const Code = require("../models/codeModel");

const updateCode = async (req, res) => {
    try {
        const { codeData, codeID } = req.body;

        const code = await Code.findById(codeID);

        code.codeData.html = codeData.html;
        code.codeData.css = codeData.css;
        code.codeData.javascript = codeData.javascript;

        const updatedCode = await code.save();

        return res.json({
            message: "Code Updated",
            data: updatedCode,
            success: true,
            codeID: updatedCode._id,
        });
    }

    catch (error) {
        console.error('Error updating code:', error);
        return res.status(500).json({
            message: "Error updating code",
            error: error.message,
            success: false,
        });
    }
}

module.exports = updateCode;