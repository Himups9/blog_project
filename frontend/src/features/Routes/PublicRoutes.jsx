import Home from "../pages/home/HomePage";
import Services from "../pages/services/ServicesPage";
import Login from "../auth/pages/Login";
import Register from "../auth/pages/Register";
import About from "../pages/about/AboutPage";
import Contact from "../pages/contact/ContactPage";

import publicBlogRoutes from "../blog/routes/publicBlogRoutes";

const publicRoutes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/services",
        element: <Services />,
    },

     {
         path: "/about",
         element: <About />,
     },
     {
         path: "/contact",
         element: <Contact />,
     },

    // Blog Routes
    ...publicBlogRoutes,
];

export default publicRoutes;