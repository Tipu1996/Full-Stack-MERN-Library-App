import { Divider } from "@mui/material";
import BorrowedBooks from "../components/BorrowedBooks";
import PersonalProfile from "../components/PersonalProfile";

const DashBoardPage = () => {
  return (
    <>
      <PersonalProfile />
      <Divider
        sx={{ borderBottomWidth: 2, marginLeft: "8%", marginRight: "8%" }}
      />
      <BorrowedBooks />
    </>
  );
};

export default DashBoardPage;
