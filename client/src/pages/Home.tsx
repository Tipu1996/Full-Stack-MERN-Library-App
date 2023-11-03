import { Route, Routes } from "react-router-dom";
import Table from "components/Table";
import AdminPage from "./AdminPage";
import Login from "./LoginPage";
import PrivateRoute from "components/PrivateRoute";
import UpdateAuthor from "components/UpdateAuthor";
import DashBoard from "components/Dashboard";

const Home = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute prop={"table"}>
              <Table />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute prop={"admin"}>
              <AdminPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute prop={"dashboard"}>
              <DashBoard />
            </PrivateRoute>
          }
        />

        <Route
          path="/update"
          element={
            <PrivateRoute prop={"admin"}>
              <UpdateAuthor />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Home;
