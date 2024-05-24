import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/app/api/authApi";
import { useEffect } from "react";
const Register = () => {
  const [register, { isError, isSuccess, error }] = useRegisterMutation();
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    register({ fullName, username, password });
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      alert("Registered Successfully");
    }
  }, [isSuccess, navigate]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col w-[25rem] border rounded-lg bg-white p-8 shadow-md gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-bold text-slate-600">Register</div>
          <div className="text-sm font-medium text-slate-500">
            Please enter your details
          </div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-slate-600"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="w-full border rounded-md p-1 outline-none ring-1 ring-slate-300 focus:ring-slate-400"
              />
            </div>
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
                Register
              </button>
              <div className="text-red-500 font-bold text-sm text-center">
                {isError ? (error as any).data.message : ""}
              </div>
            </div>
            <Link className=" font-semibold text-blue-400 mx-auto" to={"/"}>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
