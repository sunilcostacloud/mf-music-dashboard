import { mount } from 'user/UserApp';
import { userRoutingPrefix } from '../routing/constants';
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const userBasename = `/${userRoutingPrefix}`;

const UserApp = () => {

    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Listen to navigation events dispatched inside user mfe.
    useEffect(() => {
        const userNavigationEventHandler = (event) => {
            const pathname = event.detail;
            const newPathname = `${userBasename}${pathname}`;
            if (pathname === location.pathname) {
                return;
            }
            navigate(newPathname);
        };
        window.addEventListener("[user] navigated", userNavigationEventHandler);

        return () => {
            window.removeEventListener("[user] navigated", userNavigationEventHandler);
        };
    }, [location]);

    // Listen for host location changes and dispatch a notification.
    useEffect(() => {
        if (location.pathname.startsWith(userBasename)) {
            window.dispatchEvent(
                new CustomEvent("[host] navigated", {
                    detail: location.pathname.replace(userBasename, ""),
                })
            );
        }
    }, [location]);

    const isFirstRunRef = useRef(true);
    const unmountRef = useRef(() => { });
    // Mount user MFE
    useEffect(() => {
        if (!isFirstRunRef.current) {
            return;
        }
        unmountRef.current = mount({
            mountPoint: wrapperRef.current,
            initialPathname: location.pathname.replace(userBasename, ""),
        });
        isFirstRunRef.current = false;
    }, [location]);

    useEffect(() => unmountRef.current, []);

    return <div ref={wrapperRef} id="user-mfe" />;
}

export default UserApp