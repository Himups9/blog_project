import express from "express";

import {
    getAdminDashboardData,
    getUserDashboardData,
} from "./dashboard.controller.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";

const router = express.Router();

router.get(
    "/admin",
    authenticate,
    authorize("ADMIN"),
    getAdminDashboardData
);


router.get(
    "/user",
    authenticate,
    authorize("USER", "AUTHOR", "EDITOR", "ADMIN"),
    getUserDashboardData
);

export default router;