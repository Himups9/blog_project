import os from "os";
import path from "path";

const uploadRoot = process.env.VERCEL
    ? path.join(os.tmpdir(), "blog-uploads")
    : path.resolve(process.cwd(), "src/uploads");

export default uploadRoot;