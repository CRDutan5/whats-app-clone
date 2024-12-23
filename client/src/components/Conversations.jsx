import React from "react";
import { useConversations } from "../context/ConversationsProvider";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroupItem
          key={index}
          action
          active={conversation.selected}
          onClick={() => selectConversationIndex(index)}
        >
          {conversation.recipients
            .map((recipient) => recipient.name)
            .join(", ")}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
