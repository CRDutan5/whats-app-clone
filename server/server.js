const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Enable credentials if needed
  },
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  console.log(`New connection: ${id}`);

  socket.join(id);

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });

  socket.on("disconnect", () => {
    console.log(`Connection closed: ${id}`);
  });
});
