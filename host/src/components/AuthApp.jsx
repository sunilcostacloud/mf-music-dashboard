import { mount } from 'auth/AuthApp';
import { useEffect, useRef } from "react";
import { authRoutingPrefix } from '../routing/constants';
import { useLocation, useNavigate } from "react-router-dom";

const authBasename = `/${authRoutingPrefix}`;

const AuthApp = () => {
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Listen to navigation events dispatched inside auth mfe.
    useEffect(() => {
        const authNavigationEventHandler = (event) => {
            const pathname = event.detail;
            const newPathname = `${authBasename}${pathname}`;
            if (pathname === location.pathname) {
                return;
            }
            navigate(pathname === "/" ? pathname : newPathname);
        };
        window.addEventListener("[auth] navigated", authNavigationEventHandler);

        return () => {
            window.removeEventListener("[auth] navigated", authNavigationEventHandler);
        };
    }, [location]);

    // Listen for host location changes and dispatch a notification.
    useEffect(() => {
        if (location.pathname.startsWith(authBasename)) {
            window.dispatchEvent(
                new CustomEvent("[host] navigated", {
                    detail: location.pathname.replace(authBasename, ""),
                })
            );
        }
    }, [location]);

    const isFirstRunRef = useRef(true);
    const unmountRef = useRef(() => { });
    // Mount auth MFE
    useEffect(() => {
        if (!isFirstRunRef.current) {
            return;
        }
        unmountRef.current = mount({
            mountPoint: wrapperRef.current,
            initialPathname: location.pathname.replace(authBasename, ""),
        });
        isFirstRunRef.current = false;
    }, [location]);

    useEffect(() => unmountRef.current, []);

    return <div ref={wrapperRef} id="auth-mfe" />;
}

export default AuthApp