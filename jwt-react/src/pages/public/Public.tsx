import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/features/auth/authSlice";

const Public = () => {
  const token = useSelector(selectToken);
  const location = useLocation();
  return !token ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
};

export default Public;
