import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import jwtDecode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {

    const location = useLocation();

    const token = useSelector(selectCurrentToken);

    const decoded = jwtDecode(token);
    const roles = decoded?.UserInfo?.roles;

    const content = roles?.some((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : token ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/auth/signin" state={{ from: location }} replace />
    );

    return content;
};
export default RequireAuth;
