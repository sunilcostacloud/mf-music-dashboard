import { mount } from 'admin/AdminApp';
import { useEffect, useRef } from "react";
import { adminRoutingPrefix } from '../routing/constants';
import { useLocation, useNavigate } from "react-router-dom";

const adminBasename = `/${adminRoutingPrefix}`;

const AdminApp = () => {
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Listen to navigation events dispatched inside admin mfe.
    useEffect(() => {
        const adminNavigationEventHandler = (event) => {
            const pathname = event.detail;
            const newPathname = `${adminBasename}${pathname}`;
            if (pathname === location.pathname) {
                return;
            }
            navigate(pathname === "/unauthorized" ? pathname : newPathname);
        };
        window.addEventListener("[admin] navigated", adminNavigationEventHandler);

        return () => {
            window.removeEventListener("[admin] navigated", adminNavigationEventHandler);
        };
    }, [location]);

    // Listen for host location changes and dispatch a notification.
    useEffect(() => {
        if (location.pathname.startsWith(adminBasename)) {
            window.dispatchEvent(
                new CustomEvent("[host] navigated", {
                    detail: location.pathname.replace(adminBasename, ""),
                })
            );
        }
    }, [location]);

    const isFirstRunRef = useRef(true);
    const unmountRef = useRef(() => { });
    // Mount admin MFE
    useEffect(() => {
        if (!isFirstRunRef.current) {
            return;
        }
        unmountRef.current = mount({
            mountPoint: wrapperRef.current,
            initialPathname: location.pathname.replace(adminBasename, ""),
        });
        isFirstRunRef.current = false;
    }, [location]);

    useEffect(() => unmountRef.current, []);

    return <div ref={wrapperRef} id="admin-mfe" />;
}

export default AdminApp