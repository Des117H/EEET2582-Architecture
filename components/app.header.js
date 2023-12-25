import { Typography, Button } from "@mui/material";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../firebase/auth";
import Image from "react-bootstrap/Image";
import global from "../styles/global.module.css";

function AppHeader() {
  const { authUser, signOut } = useAuth();

  return authUser ? (
    <Navbar expand="lg" className="justify-content-end">
      <Container>
        <Container className={global.headerContainer}>
          <Image className={global.circleLogo} src="../logo/circle.png"></Image>
          <Image className={global.nameLogo} src="../logo/name.png"></Image>
        </Container>
        <p className={global.authContainer}>
          Welcome my child, <span className={global.authName}>{authUser?.email}</span>
        </p>
        <Button variant="contained" color="secondary" onClick={signOut}>
          log Out
        </Button>
      </Container>
    </Navbar>
  ) : (
    <Navbar expand="lg" className="justify-content-end">
      <Container>
        <Container className={global.headerContainer}>
          <Image className={global.circleLogo} src="../logo/circle.png"></Image>
          <Image className={global.nameLogo} src="../logo/name.png"></Image>
        </Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}

export default AppHeader;
