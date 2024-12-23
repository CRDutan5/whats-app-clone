import React, { useRef } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  ModalBody,
  ModalHeader,
} from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";

export default function NewContactModal({ closeModal }) {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  function handleSubmit(e) {
    e.preventDefault();

    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  }
  return (
    <>
      <ModalHeader closeButton>Create Contact</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Id</FormLabel>
            <FormControl type="text" ref={idRef} required />
          </FormGroup>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl type="text" ref={nameRef} required />
          </FormGroup>
          <Button type="submit">Create</Button>
        </Form>
      </ModalBody>
    </>
  );
}
