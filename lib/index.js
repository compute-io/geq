/**
*
*	COMPUTE: geq
*
*
*	DESCRIPTION:
*		- Computes an element-wise comparison (greater than or equal to) of an array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// GREATER THAN OR EQUAL TO //

/**
* FUNCTION: geq( arr, x )
*	Computes an element-wise comparison (greater than or equal to) of an array.
*
* @param {Array} arr - input array
* @param {Array|Number|String} x - comparator
* @returns {Array} array of 1s and 0s, where a `1` indicates that an input array element is greater than or equal to a compared value and `0` indicates that an input array element is not greater than or equal to a compared value
*/
function geq( arr, x ) {
	var isArray = Array.isArray( x ),
		type = typeof x,
		out,
		len,
		i;

	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'geq()::invalid input argument. Must provide an array.' );
	}
	if ( !isArray && ( type !== 'number' || x !== x ) && type !== 'string' ) {
		throw new TypeError( 'geq()::invalid input argument. Comparison input must either be an array, number, or string.' );
	}
	len = arr.length;
	out = new Array( len );
	if ( isArray ) {
		if ( len !== x.length ) {
			throw new Error( 'geq()::invalid input argument. Comparison array must have a length equal to that of the input array.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( arr[ i ] >= x[ i ] ) {
				out[ i ] = 1;
			} else {
				out[ i ] = 0;
			}
		}
		return out;
	}
	for ( i = 0; i < len; i++ ) {
		if ( arr[ i ] >= x ) {
			out[ i ] = 1;
		} else {
			out[ i ] = 0;
		}
	}
	return out;
} // end FUNCTION geq()


// EXPORTS //

module.exports = geq;
