import MediaLibrary from "../pages/MediaLibrary";
import UploadMedia from "../pages/UploadMedia";
import MediaTrash from "../pages/MediaTrash";


const adminMediaRoutes = [

    {
        index: true,
        element: <MediaLibrary />,
    },

    {
        path: "upload",
        element: <UploadMedia />,
    },

    {
        path: "trash",
        element: <MediaTrash />,
    },

];


export default adminMediaRoutes;