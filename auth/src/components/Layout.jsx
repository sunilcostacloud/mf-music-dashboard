import { useEffect } from "react";
import { matchRoutes, useLocation, useNavigate, Outlet } from "react-router-dom";
import { routes } from "../routing/routes";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useSelector } from 'react-redux';

export function Layout() {

  const location = useLocation();
  const navigate = useNavigate();


  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    const eventData = token;
    const event = new CustomEvent('tokenEvent', {
      detail: {
        type: 'authType',
        data: eventData,
      },
    });

    window.dispatchEvent(event);
  }, [token])

  useEffect(() => {
    function hostNavigationHandler(event) {
      const pathname = event.detail;
      if (location.pathname === pathname || !matchRoutes(routes, { pathname })) {
        return;
      }
      navigate(pathname);
    }

    window.addEventListener("[host] navigated", hostNavigationHandler);

    return () => {
      window.removeEventListener("[host] navigated", hostNavigationHandler);
    };
  }, [location]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("[auth] navigated", { detail: location.pathname })
    );
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
}
