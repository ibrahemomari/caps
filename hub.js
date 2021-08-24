"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8000;
const io = require("socket.io")(PORT);
const uuid = require("uuid").v4;

io.on("connection", (socket) => {
  console.log("CONNECTION SUCCESSFULLY:", socket.id);
});

const caps = io.of("/caps");

const queue = {
  messagesId: {},
};

caps.on("connection", (socket) => {
  socket.on("join", (room) => {
    console.log("room name:", room);
    socket.join(room);
  });

  socket.on("pickup", (payload) => {
    const id = uuid();
    queue.messagesId[id] = { event: "pickup", payload };
    caps.emit("pickup", { id, payload: queue.messagesId[id] });
    console.log(queue);
  });

  socket.on("in-transit", (payload) => {
    const id = uuid();
    queue.messagesId[id] = { event: "in-transit", payload };
    caps
      .to(payload.store)
      .emit("in-transit", { id, payload: queue.messagesId[id] });
  });

  socket.on("delivered", (payload) => {
    const id = uuid();
    queue.messagesId[id] = { event: "delivered", payload };
    caps
      .to(payload.store)
      .emit("delivered", { id, payload: queue.messagesId[id] });
  });

  socket.on("get-all", (payload) => {
    Object.keys(queue.messagesId).forEach((id) => {
      socket.emit("message", { id, payload: queue.messagesId[id] });
    });
  });

  socket.on("received", (message) => {
    delete queue.messagesId[message.id];
    console.log(queue);
  });
});
