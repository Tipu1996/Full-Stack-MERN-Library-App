import { Route, Routes } from "react-router-dom";
import AdminPage from "./AdminPage";
import PrivateRoute from "../components/PrivateRoute";
import UpdateAuthor from "../components/Admin/UpdateAuthor";
import DashBoardPage from "./DashBoardPage";
import TablePage from "./TablePage";
import BookDetailsPage from "./BookDetailsPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import VerifyEmail from "../components/Login/VerifyEmail";
import ForgotPassword from "../components/Login/ForgotPassword";
import ResetPassword from "../components/Login/ResetPassword";

const HomePage = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute prop={"table"}>
              <TablePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/book_details/:bookId"
          element={
            <PrivateRoute prop={"bookDetails"}>
              <BookDetailsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/book_details"
          element={
            <PrivateRoute prop={"bookDetails"}>
              <TablePage />
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
              <DashBoardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/update/:bookId"
          element={
            <PrivateRoute prop={"admin"}>
              <UpdateAuthor />
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

        <Route
          path="/verify_email"
          element={
            <PrivateRoute prop={"verify"}>
              <VerifyEmail />
            </PrivateRoute>
          }
        />

        <Route
          path="/resetpassword"
          element={
            <PrivateRoute prop={"resetPW"}>
              <ResetPassword />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default HomePage;
