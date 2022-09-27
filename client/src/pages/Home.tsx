import { Route, Routes } from "react-router-dom";
import Table from "components/Table";
import Admin from "./Admin";
import Login from "./LoginPage";

const Home = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Home;
