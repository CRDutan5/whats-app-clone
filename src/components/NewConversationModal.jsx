import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";

export default function NewConversationModal({ closeModal }) {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const [selectedContactIds, setSelectedContactIds] = useState([]);

  function handleCheckboxChange(contactId) {
    setSelectedContactIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  }

  return (
    <>
      <ModalHeader closeButton>Create Conversation</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            {contacts.map((contact) => (
              <Form.Group controlId={contact.id} key={contact.id}>
                <Form.Check
                  type="checkbox"
                  value={selectedContactIds.includes(contact.id)}
                  label={contact.name}
                  onChange={() => handleCheckboxChange(contact.id)}
                />
              </Form.Group>
            ))}
          </FormGroup>
          <Button type="submit">Create</Button>
        </Form>
      </ModalBody>
    </>
  );
}
