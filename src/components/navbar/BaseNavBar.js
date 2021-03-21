import React, { useContext } from "react";
import { Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import "./searchbar.css";
import FunficsSelectSearch from "./FunficsSelectSearch";

function BaseNavBar() {
  const auth = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Funfics</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/editor">Editor</Nav.Link>
          <NavDropdown title="Activity" id="basic-nav-dropdown">
            <NavDropdown.Item href="/register">Register</NavDropdown.Item>
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              disabled={!auth.isAuthenticated}
              href="/login"
              onClick={auth.logout}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FunficsSelectSearch />
        </Form>
      </Navbar.Collapse>
      <a href={"/personal"}>
        <img
          src={"person-bounding-box.svg"}
          style={{ paddingLeft: 8 }}
          width="40"
          height="40"
          alt="personal"
        />
      </a>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
}

export default BaseNavBar;
