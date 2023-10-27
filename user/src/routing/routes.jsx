import PageNotFound from 'page_not_found/PageNotFound';
import { Layout } from '../components/Layout';
import PersistLogin from '../components/PersistLogin';
import Pets from '../components/Pets';
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
                        element: <RequireAuth allowedRoles={["Admin", 'Creator', 'User']} />,
                        children: [
                            {
                                index: true,
                                element: <Pets />,
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
