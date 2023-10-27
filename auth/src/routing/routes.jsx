import { Layout } from "../components/Layout";
import SignUp from "../components/SignUp";
import SignIn from "../components/Signin";
import PageNotFound from 'page_not_found/PageNotFound';

export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "signin",
                element: <SignIn />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
        ],
    },
    // Add a 404 handling route with path="*"
    {
        path: "*",
        element: <PageNotFound />,
    },

];
