import BlogManagement from "../pages/admin/BlogManagement";
import BlogList from "../../blog/pages/dashboard/BlogList";
import BlogDetails from "../../blog/pages/public/BlogDetails";
import MyBlogs from "../../blog/pages/dashboard/MyBlogs";
import CreateBlog from "../../blog/pages/dashboard/CreateBlog";
import EditBlog from "../../blog/pages/dashboard/EditBlog";

const blogRoutes = [
    {
        path: "",
        element: <BlogManagement />,
    },
    {
        path: "list",
        element: <BlogList />,
    },
    {
        path: "create",
        element: <CreateBlog />,
    },
    {
        path: "edit/:id",
        element: <EditBlog />,
    },
    {
        path: "my-blogs",
        element: <MyBlogs />,
    },
    {
        path: ":slug",
        element: <BlogDetails />,
    },
];

export default blogRoutes;