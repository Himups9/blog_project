import CategoryManagement from "../pages/admin/CategoryManagement";
import CreateCategory from "../pages/admin/CreateCategory";
import EditCategory from "../pages/admin/EditCategory";
import ViewCategory from "../pages/admin/ViewCategory";

const adminCategoryRoutes = [
    {
        index: true,
        element: <CategoryManagement />,
    },
    {
        path: "create",
        element: <CreateCategory />,
    },
    {
        path: "edit/:id",
        element: <EditCategory />,
    },

    {
        path: "view/:id",
        element: <ViewCategory />,
    },
];

export default adminCategoryRoutes;