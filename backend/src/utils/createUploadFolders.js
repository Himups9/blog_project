import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folders = [
    "uploads/temp",

    "uploads/blogs/original",
    "uploads/blogs/optimized",
    "uploads/blogs/thumbnails",

    "uploads/users/original",
    "uploads/users/optimized",
    "uploads/users/thumbnails",

    "uploads/gallery/original",
    "uploads/gallery/optimized",
    "uploads/gallery/thumbnails",
    "uploads/gallery/composed",

    "uploads/categories/original",
    "uploads/categories/optimized",

    "uploads/settings/logo",
    "uploads/settings/favicon",
];

export default function createUploadFolders() {
    folders.forEach((folder) => {
        const folderPath = path.resolve(__dirname, "..", folder);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, {
                recursive: true,
            });
        }
    });
}
