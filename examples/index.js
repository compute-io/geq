'use strict';

var geq = require( './../lib' ),
	sum = require( 'compute-sum' );

// Simulate some data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}

var out = geq( data, 50 );

// Count the number of values greater than or equal to 50...
var count = sum( out );

console.log( 'Total: %d', count );
