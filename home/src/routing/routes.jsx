import Home from "../components/Home";
import { Layout } from "../components/Layout";
import PageNotFound from 'page_not_found/PageNotFound';
import Pricing from "../components/Pricing";

export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "pricing",
                element: <Pricing />,
            },
        ],
    },
    // Add a 404 handling route with path="*"
    {
        path: "*",
        element: <PageNotFound />,
    },

];
