import PageNotFound from 'page_not_found/PageNotFound';
import { Layout } from '../components/Layout';
import PersistLogin from '../components/PersistLogin';
import Dashboard from '../components/Dashboard';
import RequireAuth from '../components/RequireAuth';

export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                element: <PersistLogin />,
                children: [
                    {
                        element: <RequireAuth allowedRoles={["Admin", 'Creator']} />,
                        children: [
                            {
                                index: true,
                                element: <Dashboard />,
                            },
                        ]
                    },
                ],

            }
        ],
    },
    // Add a 404 handling route with path="*"
    {
        path: "*",
        element: <PageNotFound />,
    },

];
