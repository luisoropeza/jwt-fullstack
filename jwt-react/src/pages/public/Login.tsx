import { Link, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../../redux/app/api/authApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [logIn, { data, isError, isSuccess, error }] = useLogInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    logIn({ username, password });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data));
      navigate("/dashboard");
    }
  }, [isSuccess, navigate, dispatch, setToken]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col w-[25rem] border rounded-lg bg-white p-8 shadow-md gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold text-slate-600">Login</div>
          <div className="text-sm font-medium text-slate-500">
            Please enter your credentials
          </div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-slate-600"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full border rounded-md p-1 outline-none ring-1 ring-slate-300 focus:ring-slate-400"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full border rounded-md p-1 outline-none ring-1 ring-slate-300 focus:ring-slate-400"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-full flex flex-col gap-1">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold p-1 rounded-md">
                Login
              </button>
              <div className="text-red-500 font-bold text-sm text-center">
                {isError ? (error as any).data.message : ""}
              </div>
            </div>
            <Link
              className="w-min font-semibold text-blue-400 mx-auto"
              to={"/register"}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
