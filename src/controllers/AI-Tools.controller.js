import AIToolsService from '../services/AI-Tools.service.js';
import asyncHandler from '../utils/async-handler.js';

const AIToolsController = {
    useImageToText: asyncHandler(async (req, res) => {
        await AIToolsService.useImageToText(req, res);
    }),
}

export default AIToolsController