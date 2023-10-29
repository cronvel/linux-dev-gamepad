#!/usr/bin/env node

"use strict" ;

const Gamepad = require( './Gamepad' ) ;



var gamepad0 = new Gamepad( '/dev/input/js0' ) ;

gamepad0.on( 'button' , ( id , value , timeStamp ) => {
	console.log( "JS1 Button #" + id + ": " + value + " (" + timeStamp + ")" ) ;
} ) ;

gamepad0.on( 'axis' , ( id , value , timeStamp ) => {
	console.log( "JS1 Axis #" + id + ": " + value + " (" + timeStamp + ")" ) ;
} ) ;



var gamepad1 = new Gamepad( '/dev/input/js1' ) ;

gamepad1.on( 'button' , ( id , value , timeStamp ) => {
	console.log( "JS2 Button #" + id + ": " + value + " (" + timeStamp + ")" ) ;
} ) ;

gamepad1.on( 'axis' , ( id , value , timeStamp ) => {
	console.log( "JS2 Axis #" + id + ": " + value + " (" + timeStamp + ")" ) ;
} ) ;



/*
const fs = require( 'fs' ) ;
const stream = fs.createReadStream( '/dev/input/event9' ) ;
stream.on( 'data' , data => {
	console.log( "event data:" , data ) ;
} ) ;
//*/

