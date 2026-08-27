import ProfileSettings from "../pages/ProfileSettings";
import AccountSettings from "../pages/AccountSettings";

const settingsRoutes = [
    {
        index: true,
        element: <ProfileSettings />,
    },

    {
        path: "profile",
        element: <ProfileSettings />,
    },

    {
        path: "account",
        element: <AccountSettings />,
    },
];

export default settingsRoutes;