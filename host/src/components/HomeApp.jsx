import { mount } from 'home/HomeApp';
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HomeApp = () => {
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Listen to navigation events dispatched inside home mfe.
    useEffect(() => {
        const homeNavigationEventHandler = (event) => {
            const pathname = event.detail;
            console.log("checkLayout home", pathname, location)
            if (pathname === location.pathname) {
                return;
            }
            navigate(pathname);
        };
        window.addEventListener("[home] navigated", homeNavigationEventHandler);

        return () => {
            window.removeEventListener("[home] navigated", homeNavigationEventHandler);
        };
    }, [location]);

    // Listen for host location changes and dispatch a notification.
    useEffect(() => {
        window.dispatchEvent(
            new CustomEvent("[host] navigated", {
                detail: location.pathname,
            })
        );
    }, [location]);

    const isFirstRunRef = useRef(true);
    const unmountRef = useRef(() => { });
    // Mount home MFE
    useEffect(() => {
        if (!isFirstRunRef.current) {
            return;
        }
        unmountRef.current = mount({
            mountPoint: wrapperRef.current,
            initialPathname: location.pathname,
        });
        isFirstRunRef.current = false;
    }, [location]);

    useEffect(() => unmountRef.current, []);

    return <div ref={wrapperRef} id="home-mfe" />;
}

export default HomeApp