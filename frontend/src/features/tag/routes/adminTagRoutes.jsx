import TagManagement from "../pages/admin/TagManagement";
import CreateTag from "../pages/admin/CreateTag";
import EditTag from "../pages/admin/EditTag";


const adminTagRoutes = [

    {
        index: true,
        element: <TagManagement />,
    },

    {
        path: "create",
        element: <CreateTag />,
    },

    {
        path: "edit/:id",
        element: <EditTag />,
    },

];


export default adminTagRoutes;