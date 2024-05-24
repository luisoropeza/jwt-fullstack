import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./pages/public/Public";
import Login from "./pages/public/Login";
import RequireAuth from "./pages/auth/RequireAuth";
import Dashboard from "./pages/auth/Dashboard";
import NotFound from "./pages/NotFound";
import Users from "./pages/auth/Users";
import Register from "./pages/public/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Public />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
