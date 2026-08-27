// backend/src/routes/index.js

import express from "express";

import authRoutes from "../models/auth/auth.routes.js";
import userRoutes from "../models/users/user.routes.js";
import categoryRoutes from "../models/category/category.routes.js";
import tagRoutes from "../models/tag/tag.routes.js";
import blogRoutes from "../models/blogs/blog.routes.js";
import commentRoutes from "../models/comment/comment.routes.js";
import galleryRoutes from "../models/gallery/gallery.routes.js";
import settingsRoutes from "../models/settings/settings.routes.js";
import dashboardRoutes from "../models/dashboard/dashboard.routes.js";
import contactRoutes from "../models/contact/contact.routes.js";

const router = express.Router();


router.use("/auth", authRoutes);


router.use("/users", userRoutes);


router.use("/categories", categoryRoutes);



router.use("/tags", tagRoutes);



router.use("/blogs", blogRoutes);



router.use("/comments", commentRoutes);



router.use("/gallery", galleryRoutes);


router.use("/settings", settingsRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/contact", contactRoutes);

export default router;
