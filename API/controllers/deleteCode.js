const Code = require('../models/codeModel');

const deleteCode = async (req, res) => {
    const { codeId } = req.body; 
    console.log('Code ID:', codeId);
    try {
        const code = await Code.findByIdAndDelete(codeId);
        if (!code) {
            return res.status(404).json({ message: 'Code not found' });
        }
        return res.json({
            message: 'Code deleted successfully'
        });
    }
    catch (error) {
        console.error("Error deleting code:", error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

module.exports = deleteCode;