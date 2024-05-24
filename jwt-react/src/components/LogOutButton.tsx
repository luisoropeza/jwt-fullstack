import { useDispatch } from "react-redux";
import { logOut } from "../redux/features/auth/authSlice";

const LogOutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className="flex p-4 justify-end">
      <a href="/">
        <button
          className="bg-red-500 hover:bg-red-400 text-sm text-white font-bold px-2 py-1 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </a>
    </div>
  );
};

export default LogOutButton;
