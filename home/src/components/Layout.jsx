import { useEffect } from "react";
import { matchRoutes, useLocation, useNavigate, Outlet } from "react-router-dom";
import { routes } from "../routing/routes";

export function Layout() {

  const location = useLocation();
  const navigate = useNavigate();

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
    console.log("checkLayout", location.pathname)
    window.dispatchEvent(
      new CustomEvent("[home] navigated", { detail: location.pathname })
    );
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
}
