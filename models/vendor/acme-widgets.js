"use strict";

require("dotenv").config();

const faker = require("faker");
const HOST = process.env.HOST || "http://localhost:8000";
const io = require("socket.io-client");
const socket = io.connect(`${HOST}/caps`);

const storeName =  "acme-widgets";

socket.emit("join", storeName);

let vendor = { clientID: storeName, event: "delivered" };

socket.emit("get-all", vendor);

socket.on("message", (message) => {
  if (
    message.payload.event === "delivered" &&
    message.payload.payload.store === storeName
  ) {
    vendorFunction(message);
  }
  if (
    message.payload.event === "in-transit" &&
    message.payload.payload.store === storeName
  ) {
    socket.emit("received", message.id);
  }
});

socket.on("in-transit", (message) => {
  socket.emit("received", message.id);
});

setInterval(() => {
  let order = {
    store: storeName,
    orderId: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
  };
  socket.emit("pickup", order);
}, 5000);

socket.on("delivered", vendorFunction);

function vendorFunction(message) {
  console.log(
    `${storeName}: Thank you for delivering ${message.payload.payload.orderId}`
  );

  socket.emit("received", message.id);
}
