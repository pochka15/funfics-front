import React, {useState} from 'react';
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";

function BaseNavBar() {
  // const [activeKey, setActiveKey] = useState('/')

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Funfics</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/sandbox">Sandbox</Nav.Link>
          <Nav.Link href="/editor">Editor</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    // <div style={{padding: 10}} className={"border border-dark rounded"}>
    //   <Nav
    //     variant="pills"
    //     activeKey={activeKey}
    //     onSelect={(selectedKey) => setActiveKey(selectedKey)}
    //   >
    //     <Nav.Item>
    //       <Nav.Link eventKey="/" href="/">Home</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="/editor" href="/editor">Editor</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="/sandbox" href="/sandbox">Sandbox</Nav.Link>
    //     </Nav.Item>
    //   </Nav>
    // </div>
  );
}

export default BaseNavBar;