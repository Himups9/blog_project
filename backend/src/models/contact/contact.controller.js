import prisma from "../../config/prisma.js";

import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

const create = asyncHandler(async (req, res) => {
    const message = await prisma.contactMessage.create({
        data: req.validatedData,
        select: {
            id: true,
            name: true,
            email: true,
            subject: true,
            message: true,
            createdAt: true,
        },
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            "Message sent successfully.",
            message
        )
    );
});

export default { create };
