#!/usr/bin/env node

"use strict" ;

const Gamepad = require( './Gamepad' ) ;


var gamepad = new Gamepad( '/dev/input/js0' ) ;

gamepad.on( 'button' , ( id , value , timeStamp ) => {
	console.log( "Button #" + id + ": " + value + " (" + timeStamp + ")" ) ;
} ) ;

gamepad.on( 'axis' , ( id , value , timeStamp ) => {
	console.log( "Axis #" + id + ": " + value + " (" + timeStamp + ")" ) ;
} ) ;



/*
const fs = require( 'fs' ) ;
const stream = fs.createReadStream( '/dev/input/event9' ) ;
stream.on( 'data' , data => {
	console.log( "event data:" , data ) ;
} ) ;
//*/

