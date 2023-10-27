import { useEffect } from "react";
import { matchRoutes, useLocation, useNavigate, Outlet } from "react-router-dom";
import { routes } from "../routing/routes";
import { saveToken, selectCurrentToken } from "../redux/features/auth/authSlice";
import { useSelector, useDispatch } from 'react-redux';

export function Layout() {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();


  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    const handleEvent = (event) => {
      if (event.detail.type === 'authType') {
        dispatch(saveToken(event.detail.data))
      }
    };

    window.addEventListener('tokenEvent', handleEvent);

    return () => {
      window.removeEventListener('tokenEvent', handleEvent);
    };
  }, []);

  // console.log("adminToken", token)


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
      new CustomEvent("[admin] navigated", { detail: location.pathname })
    );
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
}
