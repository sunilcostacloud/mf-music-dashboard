import PageNotFound from "page_not_found/PageNotFound";
import { Layout } from "../components/Layout";
import AdminPage from "../components/AdminPage";
import EditUser from "../components/EditUser";
import PersistLogin from "../components/PersistLogin";
import RequireAuth from "../components/RequireAuth";

export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                element: <PersistLogin />,
                children: [
                    {
                        element: <RequireAuth allowedRoles={["Admin"]} />,
                        children: [
                            {
                                index: true,
                                element: <AdminPage />,
                            },
                            {
                                path: ":id",
                                element: <EditUser />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    // Add a 404 handling route with path="*"
    {
        path: "*",
        element: <PageNotFound />,
    },
];
