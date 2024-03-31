import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 3000);

  return (
    <h3>
      Only Users with Admin rights can have access to this page; You will be
      redirected to the home page in 3 seconds
    </h3>
  );
};

export default Forbidden;
