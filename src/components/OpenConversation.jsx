import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import { useConversations } from "../context/ConversationsProvider";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const lastMessageRef = useRef();
  const { sendMessage, selectedConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  }

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ smooth: true });
    }
  });

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className=" d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? lastMessageRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe ? "align-self-end" : ""
                }`}
              >
                <div
                  className={`rounded p-2 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-end" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <FormControl
              as="textarea"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ height: "75px", resize: "none" }}
            />
            <Button type="submit">Send</Button>
          </InputGroup>
        </FormGroup>
      </Form>
    </div>
  );
}
