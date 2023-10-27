import { lazy, Suspense } from "react";
import { Layout } from "../components/Layout";
import Progress from "../components/Progress";
import UnAuthorized from "../components/UnAuthorized";
import { authRoutingPrefix, adminRoutingPrefix, creatorRoutingPrefix, userRoutingPrefix } from '../routing/constants';

const HomeLazy = lazy(() => import('../components/HomeApp'));
const AuthLazy = lazy(() => import('../components/AuthApp'));
const AdminLazy = lazy(() => import('../components/AdminApp'));
const CreatorLazy = lazy(() => import('../components/CreatorApp'));
const UserLazy = lazy(() => import('../components/UserApp'));

export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Progress />}><HomeLazy /></Suspense>
                ),
            },
            {
                path: "unauthorized",
                element: <UnAuthorized />,
            },
            {
                path: `${authRoutingPrefix}/*`,
                element: (
                    <Suspense fallback={<Progress />}><AuthLazy /></Suspense>
                ),
            },
            {
                path: `${adminRoutingPrefix}/*`,
                element: (
                    <Suspense fallback={<Progress />}><AdminLazy /></Suspense>
                ),
            },
            {
                path: `${creatorRoutingPrefix}/*`,
                element: (
                    <Suspense fallback={<Progress />}><CreatorLazy /></Suspense>
                ),
            },
            {
                path: `${userRoutingPrefix}/*`,
                element: (
                    <Suspense fallback={<Progress />}><UserLazy /></Suspense>
                ),
            },
            {
                path: "*",
                element: (
                    <Suspense fallback={<Progress />}><HomeLazy /></Suspense>
                ),
            },
        ],
    },
];

