import { mount } from 'creator/CreatorApp';
import { creatorRoutingPrefix } from '../routing/constants';
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const creatorBasename = `/${creatorRoutingPrefix}`;

const CreatorApp = () => {

    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();


    // Listen to navigation events dispatched inside creator mfe.
    useEffect(() => {
        const creatorNavigationEventHandler = (event) => {
            const pathname = event.detail;
            console.log("checkCreator", pathname, location.pathname)
            const newPathname = `${creatorBasename}${pathname}`;
            if (pathname === location.pathname) {
                return;
            }
            navigate(pathname === "/unauthorized" ? pathname : newPathname);
        };
        window.addEventListener("[creator] navigated", creatorNavigationEventHandler);

        return () => {
            window.removeEventListener("[creator] navigated", creatorNavigationEventHandler);
        };
    }, [location]);

    // Listen for host location changes and dispatch a notification.
    useEffect(() => {
        if (location.pathname.startsWith(creatorBasename)) {
            window.dispatchEvent(
                new CustomEvent("[host] navigated", {
                    detail: location.pathname.replace(creatorBasename, ""),
                })
            );
        }
    }, [location]);

    const isFirstRunRef = useRef(true);
    const unmountRef = useRef(() => { });
    // Mount creator MFE
    useEffect(() => {
        if (!isFirstRunRef.current) {
            return;
        }
        unmountRef.current = mount({
            mountPoint: wrapperRef.current,
            initialPathname: location.pathname.replace(creatorBasename, ""),
        });
        isFirstRunRef.current = false;
    }, [location]);

    useEffect(() => unmountRef.current, []);

    return <div ref={wrapperRef} id="creator-mfe" />;
}

export default CreatorApp