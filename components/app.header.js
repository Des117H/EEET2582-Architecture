import { Typography, Button } from "@mui/material";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../firebase/auth";
import Image from "react-bootstrap/Image";
import global from "../styles/global.module.css";
import { useRouter } from "next/router";

function AppHeader() {
	const { authUser, signOut } = useAuth();
	const router = useRouter();

	// Delete document image from Storage
	const onAccount = async () => {
		router.push("/account")
	};

	return (
		<Navbar expand="lg" className="justify-content-end">
			<Container>
				<Container className={global.headerContainer}>
					<Image className={global.circleLogo} src="../logo/circle.png"></Image>
					<Image className={global.nameLogo} src="../logo/name.png"></Image>
				</Container>
				{(router.pathname == "/dashboard") &&
					<p className={global.authContainer}>
						Welcome my child, <button className={global.authName} onClick={onAccount}>{authUser?.email}</button>
					</p>}
				{(authUser) &&
				<div>
					<Button variant="contained" color="secondary" onClick={signOut}>
						log Out
					</Button> 
				</div>
				}
			</Container>
		</Navbar>
	);
}

export default AppHeader;
