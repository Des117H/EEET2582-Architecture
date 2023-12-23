import { Typography } from '@mui/material';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../firebase/auth';
import Image from 'react-bootstrap/Image';
import global from '../styles/global.module.css';

function AppHeader() {

  const { authUser } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary justify-content-end">
      <Container>
        <Container >
        <Image className={global.circleLogo} src='../logo/circle.png'></Image>
        <Image className={global.nameLogo} src='../logo/name.png'></Image>
        </Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>{authUser?.email}</Typography>
            <Button variant="text" color='secondary'>Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppHeader;