import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v7 as uuidV7 } from "uuid";

export default function Login({ onIdSubmit }) {
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onIdSubmit(idRef.current.value);
  };

  const createNewId = () => {
    onIdSubmit(uuidV7());
  };

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="me-2">
          Login
        </Button>
        <Button variant="secondary" onClick={createNewId}>
          Create a New Id
        </Button>
      </Form>
    </Container>
  );
}
