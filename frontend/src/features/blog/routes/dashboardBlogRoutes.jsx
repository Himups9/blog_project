import MyBlogs from "../pages/dashboard/MyBlogs";
import CreateBlog from "../pages/dashboard/CreateBlog";
import EditBlog from "../pages/dashboard/EditBlog";

const dashboardBlogRoutes = [
    {
        index: true,
        element: <MyBlogs />,
    },
    {
        path: "create",
        element: <CreateBlog />,
    },
    {
        path: "edit/:id",
        element: <EditBlog />,
    },
];

export default dashboardBlogRoutes;