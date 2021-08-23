"use strict";

require('dotenv').config();
const io=require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:8000';
const socket=io.connect(`${HOST}/caps`);



socket.on('driverPickup', payload=>{
    setTimeout(()=>{
        console.log(`DRIVER: picked up ${payload.orderId}`);
        socket.emit('transit',payload);
    },5000);
});


socket.on('driverTransit',payload=>{
    setTimeout(()=>{
        console.log(`DRIVER: delivered  up ${payload.orderId}`);
        socket.emit('deleverd',payload);
        
    },3000)
});


