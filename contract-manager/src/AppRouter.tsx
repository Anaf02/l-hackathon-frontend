import { Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TestPage from "./pages/TestPage";
import { useSimpleAuth } from "./components/Context/AuthContext/useSimpleAuthHook";
import Layout from "./Layout/Layout";
import Contracts from "./pages/Contracts";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contracts" element={<Contracts />} />

      {/* <Route element={<ProtectedRoute />}>
        <Route path="/contracts" element={<Contracts />} />
      </Route> */}
    </Routes>
  );
}

export default AppRouter;

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSimpleAuth();
  if (!isAuthenticated) {
    navigate("/login");
  }
  return <Outlet />;
};
