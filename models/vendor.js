"use strict";

require('dotenv').config();
let faker =require('faker');
const events=require('../events');

setInterval(() => {
    setTimeout(()=>{
        let customerOrder={
            storeName:process.env.STORENAME || 'doon',
            orderId:faker.datatype.uuid(),
            customerName:faker.name.findName(),
            address:faker.address.streetAddress()
        };
    
        events.emit('pickup',customerOrder);
    },5000);
}, 5000);



events.on('vendorDileverd',payload=>{
    console.log(`thank you for delivering ${payload.orderId}`);
    events.emit('deleverd', payload);
})


module.exports=events