const code = require("../models/codeModel");

const getCode = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.json({
                message: "Please provide an id",
            });
        }

        const codeData = await code.findById(id);

        return res.json({
            message: "Code fetched",
            data: codeData,
            success: true,
        });
    } catch (error) {
        return res.json({
            message: "Error fetching code",
            success: false,
        });
    }
};

module.exports = getCode;
