"use strict";

require("dotenv").config();

const io = require("socket.io-client");
const HOST = process.env.PORT || "http://localhost:8000";
const socket = io.connect(`${HOST}/caps`);

let driver = { clientID: "driver", event: "pickup" };

socket.emit("get-all", driver);

socket.on("message", (message) => {
  if (message.payload.event === "pickup") {
    driverFunction(message);
  }
});

socket.on("pickup", driverFunction);

function driverFunction(message) {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${message.payload.payload.orderId}`);
    socket.emit("in-transit", message.payload.payload);
  }, 1500);

  setTimeout(() => {
    console.log(`Driver: delivered up ${message.payload.payload.orderId}`);
    socket.emit("delivered", message.payload.payload);
  }, 3000);

  socket.emit("received", message.id);
}
