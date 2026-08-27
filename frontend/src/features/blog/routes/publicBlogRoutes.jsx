import BlogList from "../pages/public/BlogList";
import BlogDetails from "../pages/public/BlogDetails";
import CategoryBlogs from "../pages/public/CategoryBlogs";
import SearchBlogs from "../pages/public/SearchBlogs";

const publicBlogRoutes = [
    {
        path: "blogs",
        element: <BlogList />,
    },
    {
        path: "blogs/category/:slug",
        element: <CategoryBlogs />,
    },
    {
        path: "blogs/search",
        element: <SearchBlogs />,
    },
    {
        path: "blogs/:slug",
        element: <BlogDetails />,
    },
];

export default publicBlogRoutes;