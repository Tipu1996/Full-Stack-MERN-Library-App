import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/login");
  }, 5000);

  return (
    <>
      <h3>
        Only Users with Admin rights can have access to this page; You will be
        redirected to the login page
      </h3>
    </>
  );
};

export default Forbidden;
