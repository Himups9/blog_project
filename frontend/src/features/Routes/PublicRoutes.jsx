import Home from "../pages/home/HomePage";
import Services from "../pages/services/ServicesPage";

import Login from "../auth/pages/Login";
import Register from "../auth/pages/Register";
import ForgotPassword from "../auth/pages/ForgotPassword";
import ResetPassword from "../auth/pages/ResetPassword";

import About from "../pages/about/AboutPage";
import Contact from "../pages/contact/ContactPage";

import GalleryPage from "../gallery/pages/GalleryPage";

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
        path: "/forgot-password",
        element: <ForgotPassword />,
    },

    {
        path: "/reset-password/:token",
        element: <ResetPassword />,
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

     {
        path: "/gallery",
        element: <GalleryPage />,
    },

    // Blog Routes
    ...publicBlogRoutes,
];

export default publicRoutes;