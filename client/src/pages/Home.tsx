import { Route, Routes } from "react-router-dom";
import Table from "components/Table";
import Admin from "./Admin";

const Home = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default Home;
