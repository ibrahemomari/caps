"use strict";

require('dotenv').config();
let faker =require('faker');
const io=require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:8000';
const socket=io.connect(`${HOST}/caps`);

setInterval(() => {
        let customerOrder={
            storeName:process.env.STORENAME || 'doon',
            orderId:faker.datatype.uuid(),
            customerName:faker.name.findName(),
            address:faker.address.streetAddress()
        };
    
        socket.emit('pickup',customerOrder);
}, 1500);



socket.on('vendorDileverd',payload=>{
    console.log(`thank you for delivering ${payload.orderId}`);
    // socket.emit('vendorDileverd', payload);
})
