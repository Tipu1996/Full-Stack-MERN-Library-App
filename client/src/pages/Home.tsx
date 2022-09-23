import { Route, Routes } from "react-router-dom";
import Table from "components/Table";

const Home = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
      </Routes>
    </>
  );
};

export default Home;
