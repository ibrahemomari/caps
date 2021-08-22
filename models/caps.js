"use strict";

const events=require('../events');
require('./driver');
require('./vendor');

let d = new Date();
let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
let time=d.toLocaleTimeString()

// pickup
events.on('pickup',payload=>{
    console.log('event:',{
        event:'pickup',
        time:`${ye}-${mo}-${da} T ${time}`,
        payload:payload
    });
    events.emit('driverPickup',payload);
});


// transit
events.on('transit',payload=>{
    console.log('event:',{
        event:'transit',
        time:`${ye}-${mo}-${da} T ${time}`,
        payload:payload
    });
    events.emit('driverTransit',payload);
});

// deleverd

events.on('deleverd',payload=>{
    console.log('event:',{
        event:'deleverd',
        time:`${ye}-${mo}-${da} T ${time}`,
        payload:payload
    });
    events.emit('driverDeleverd',payload);
});


module.exports=events