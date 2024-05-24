import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../../redux/app/api/userApi";

const Users = () => {
  const { data, isLoading, isError, error } = useGetAllUsersQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full gap-4">
        <div className="loader"></div>
        <div className="text-xl font-bold text-slate-600">Loading...</div>
      </div>
    );
  if (isError && (error as any).status === 403)
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="text-xl font-bold text-slate-700">
          {(error as any).data.message}
        </div>
        <Link className="w-min" to={"/dashboard"}>
          <button className="bg-blue-500 hover:bg-blue-400 text-sm text-white font-bold px-2 py-1 rounded-md">
            Back
          </button>
        </Link>
      </div>
    );
  return (
    <>
      <div className="flex h-full items-center justify-center p-1">
        <div className="flex h-[30rem] flex-col w-[60rem] overflow-x-auto border rounded-lg bg-white p-6 shadow-md gap-4 text-slate-600">
          <div className="text-3xl font-bold">Users</div>
          <div className="h-full border rounded-lg overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="border-r p-2">Username</th>
                  <th className="border-r p-2">Full Name</th>
                  <th className="p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((user) => (
                  <tr
                    key={user.id}
                    className={`${
                      user.id % 2 !== 0 ? "bg-black/5" : "bg-white"
                    } border-b`}
                  >
                    <td className=" py-1 px-2 border-r">{user.username}</td>
                    <td className=" py-1 px-2 border-r">{user.fullName}</td>
                    <td className=" py-1 px-2">{user.role?.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link className="w-min" to={"/dashboard"}>
            <button className="bg-blue-500 hover:bg-blue-400 text-sm text-white font-bold px-2 py-1 rounded-md">
              Back
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Users;
