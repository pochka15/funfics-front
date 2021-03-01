import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Row} from "react-bootstrap";

export default function BootstrapSandbox() {
  const [counter, setCounter] = React.useState(0);
  const incrementRef = undefined;
  const incrementCounter = () => setCounter(counter + 1);
  const focusButtons = () => incrementRef.focus();

  return (
    <Container>
      <Row>
        <Col>
          <p>{counter}</p>
        </Col>
        <Col>
          <Button ref={incrementRef} className="primary" onClick={incrementCounter}>
            Increment
          </Button>
        </Col>
        <Col>
          <Button className="primary" onClick={focusButtons}>
            Focus
          </Button>
        </Col>
      </Row>
    </Container>
  )
}