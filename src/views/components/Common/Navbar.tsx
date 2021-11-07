import React, { useContext } from "react";
import { default as BootstrapNav } from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { Link } from "react-router-dom";
import LogoThinImage from "../../assets/icons/logo-thin.png";
import { RouterPath } from "../../enums/UrlPath";
import { AuthContext } from "../Authentication/AuthProvider";
import { AuthReducer } from "../../enums/Reducers";

const Navbar = () => {
  const auth = useContext(AuthContext);

  const authLogout = () => {
    auth.dispatcher({ type: AuthReducer.Logout });
  }

  return (
    <BootstrapNav bg="light" expand="sm">
      <Container fluid>
        <BootstrapNav.Brand target="_self" href={RouterPath.Home}>
          <Image src={LogoThinImage} height="26px" />
        </BootstrapNav.Brand>
        <BootstrapNav.Toggle aria-controls="navbar-toggle" />
        <BootstrapNav.Collapse id="navbar-toggle">
          <Link to={RouterPath.Home}>
            <Button className="m-1 me-1 btn-sm" variant="primary">
              Home
            </Button>
          </Link>
          {auth.state.isReady && auth.state.isAuthenticated && (
            <>
              <Link to={RouterPath.Dashboard}>
                <Button className='m-1 me-1 btn-sm' variant='primary'>
                  Dashboard
                </Button>
              </Link>
            </>
          )}
          <Link to={RouterPath.About}>
            <Button className="m-1 me-1 btn-sm" variant="primary">
              About
            </Button>
          </Link>
          <div style={{ flex: "1 1 auto" }}></div>
          {!auth.state.isReady && (
            <Button className='m-1 me-4 btn-sm' variant='primary'>
              Loading
            </Button>
          )}
          {auth.state.isReady && !auth.state.isAuthenticated && (
            <Link to={RouterPath.Login}>
              <Button className="m-1 me-4 btn-sm" variant="primary">
                Login
              </Button>
            </Link>
          )}
          {auth.state.isReady && auth.state.isAuthenticated && (
            <Button className='m-1 me-4 btn-sm' variant='danger' onClick={authLogout}>
              Logout
            </Button>
          )}
        </BootstrapNav.Collapse>
      </Container>
    </BootstrapNav>
  );
};

export { Navbar };
