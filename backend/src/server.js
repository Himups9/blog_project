import "dotenv/config";

import app from "./app.js";
import createUploadFolders from "./utils/createUploadFolders.js";

const PORT = Number(process.env.PORT) || 5001;

createUploadFolders();

app.listen(PORT, "127.0.0.1", () => {
    console.log(`
====================================
🚀 Server Started Successfully
🌍 Environment : ${process.env.NODE_ENV || "development"}
📡 URL         : http://127.0.0.1:${PORT}
====================================
`);
});