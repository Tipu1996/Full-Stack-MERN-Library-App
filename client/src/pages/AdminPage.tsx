import { Divider } from "@mui/material";
import AddBook from "../components/Admin/AddBook";
import ShowUsers from "../components/Admin/ShowUsers";

const AdminPage = () => {
	return (
		<>
			<AddBook />
			<Divider
				sx={{
					borderBottomWidth: 2,
					marginLeft: "8%",
					marginRight: "8%",
				}}
			/>
			<ShowUsers />
		</>
	);
};

export default AdminPage;
