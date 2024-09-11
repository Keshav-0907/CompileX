const code = require("../models/codeModel");

const saveCode = async (req, res) => {
    try {
        const { html, css, javascript } = req.body;

        console.log('hhe', req.body);

        const newCode = new code({
            codeData: {
                html,
                css,
                javascript,
            },
        });

        await newCode.save();

        return res.json({
            message: "Code Saved",
            data: newCode,
            success: true,
        });
    } catch (error) {
        return res.json({
            message: "Error saving code",
            success: false,
        });
    }
};

module.exports = saveCode;
