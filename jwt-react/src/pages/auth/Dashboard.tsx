import { Link } from "react-router-dom";
import { useGetUserAuthenticatedQuery } from "../../redux/app/api/userApi";

const Dashboard = () => {
  const { data, isLoading, isError, error } = useGetUserAuthenticatedQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full gap-4">
        <div className="loader"></div>
        <div className="text-xl font-bold text-slate-600">Loading...</div>
      </div>
    );
  if (isError && (error as any).data.status === (403 || 401))
    return (
      <div className="flex items-center justify-center h-full">
        {(error as any).data.message}
      </div>
    );
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col w-[30rem] border rounded-lg bg-white p-8 shadow-md gap-4 text-slate-600">
        <div className="text-2xl font-bold text-center">Welcome</div>
        <div className="text-base">
          <strong>Full Name:</strong> {data?.fullName}
        </div>
        <div className="text-base">
          <strong>Username:</strong> {data?.username}
        </div>
        <div className="text-base">
          <strong>Role:</strong> {data?.role?.name}
        </div>
        <div className="text-base">
          <strong>Create At:</strong>{" "}
          {data?.createdAt ? new Date(data?.createdAt).toLocaleString() : "N/A"}
        </div>
        <Link to={"/users"}>
          <button className="w-full bg-blue-500 hover:bg-blue-400 text-sm text-white font-bold px-2 py-1 rounded-md">
            View all users
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
