import { Router } from "express";

import contactController from "./contact.controller.js";
import validate from "../../middleware/validate.middleware.js";
import { contactSchema } from "../../validators/contact.validator.js";

const router = Router();

router.post("/", validate(contactSchema), contactController.create);

export default router;
