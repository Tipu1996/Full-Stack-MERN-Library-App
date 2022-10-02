import { Route, Routes } from "react-router-dom";
import Table from "components/Table";
import Admin from "./Admin";
import Login from "./LoginPage";
import PrivateRoute from "components/PrivateRoute";
import UpdateAuthor from "components/UpdateAuthor";

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
              <Admin />
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
