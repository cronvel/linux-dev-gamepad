
"use strict" ;

const fs = require( 'fs' ) ;
const LeanEvents = require( 'nextgen-events/lib/LeanEvents' ) ;



function Gamepad( devicePath ) {
	this.devicePath = devicePath ;
	this.stream = fs.createReadStream( this.devicePath ) ;

	this.buttons = [] ;
	this.axes = [] ;

	this.onData = this.onData.bind( this ) ;
	this.stream.on( 'data' , this.onData ) ;
}

Gamepad.prototype = Object.create( LeanEvents.prototype ) ;
Gamepad.prototype.constructor = Gamepad ;

module.exports = Gamepad ;



const RAW_BUTTON = 1 ;
const RAW_AXIS = 2 ;
const RAW_BUTTON_STATE = 129 ;
const RAW_AXIS_STATE = 130 ;

const TYPE_NAME = [] ;
TYPE_NAME[ RAW_BUTTON ] = 'button' ;
TYPE_NAME[ RAW_AXIS ] = 'axis' ;
TYPE_NAME[ RAW_BUTTON_STATE ] = 'addButton' ;
TYPE_NAME[ RAW_AXIS_STATE ] = 'addAxis' ;



Gamepad.prototype.onData = function( buffer ) {
	//console.log( "Received:" , buffer ) ;
	for ( let pointer = 0 ; pointer < buffer.length ; pointer += 8 ) {
		console.log( "Frame:" , buffer.slice( pointer , pointer + 8 ) ) ;
		let type = buffer[ pointer + 6 ] ;
		let typeName = TYPE_NAME[ type ] || 'unknown_' + type ;
		let id = buffer[ pointer + 7 ] ;
		let value = buffer.readInt16LE( pointer + 4 ) ;
		let timeStamp = buffer.readInt32LE( pointer ) ;

		switch ( type ) {
			case RAW_BUTTON_STATE : {
				//console.log( "button state:" , id , value ) ;
				this.buttons[ id ] = new InputStates( false , value , timeStamp ) ;
				break ;
			}
			case RAW_AXIS_STATE : {
				//console.log( "axis state:" , id , value ) ;
				this.axes[ id ] = new InputStates( true , value , timeStamp ) ;
				break ;
			}
			case RAW_BUTTON : {
				if ( ! this.buttons[ id ] ) { this.buttons[ id ] = new InputStates( false ) ; }
				let button = this.buttons[ id ] ;
				button.value = value ;
				button.lastTimeStamp = timeStamp ;

				this.emit( 'button' , id , value , timeStamp ) ;
				break ;
			}
			case RAW_AXIS : {
				if ( ! this.axes[ id ] ) { this.axes[ id ] = new InputStates( true ) ; }
				let axis = this.axes[ id ] ;
				axis.value = value ;
				axis.lastTimeStamp = timeStamp ;

				this.emit( 'axis' , id , value , timeStamp ) ;
				break ;
			}
		}
	}
} ;



function InputStates( isAxis , value = 0 , lastTimeStamp = 0 ) {
	this.isAxis = !! isAxis ;
	//this.isAnalogic = !! isAnalogic ;
	this.value = value ;
	this.lastTimeStamp = lastTimeStamp ;
}


