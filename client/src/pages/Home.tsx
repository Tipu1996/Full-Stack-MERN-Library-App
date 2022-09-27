import { Route, Routes } from "react-router-dom";
import Table from "components/Table";
import Admin from "./Admin";

import { GoogleLogin } from "@react-oauth/google";

const Home = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
    </>
  );
};

export default Home;
