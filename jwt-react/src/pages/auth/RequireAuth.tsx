import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  logOut,
  selectExpiresIn,
  selectToken,
} from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import LogOutButton from "../../components/LogOutButton";

const RequireAuth = () => {
  const token = useSelector(selectToken);
  const expiresIn = useSelector(selectExpiresIn);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (expiresIn) {
      const checkExpiration = () => {
        if (Date.now() > expiresIn) {
          dispatch(logOut());
        }
      };
      checkExpiration();
      const interval = setInterval(checkExpiration, 1000);
      return () => clearInterval(interval);
    }
  }, [expiresIn, dispatch]);

  return token ? (
    <div className="flex min-h-screen">
      <div className="flex flex-col w-full">
        <LogOutButton />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
