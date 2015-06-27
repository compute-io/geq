'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' );

// FUNCTIONS //

var GEQ = require( './element.js' );


// GREATER THAN OR EQUAL TO //

/**
* FUNCTION: geq( out, x, y, clbk )
*	Computes an element-wise comparison (greater than or equal to) of an array using an accessor.
*
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Array|Number[]|String[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number|String} y - comparator
* @param {Function} accessor - accessor function for accessing array values
* @returns {Array} array of 1s and 0s, where a `1` indicates that an input array element is greater than or equal to a compared value and `0` indicates that an input array element is less than a compared value
*/
function geq( out, arr, y, clbk ) {
	var len = arr.length,
			i,
			arrVal, yVal;

		if ( isTypedArrayLike( y ) ) {
			if ( len !== y.length ) {
				throw new Error( 'geq()::invalid input argument. Comparator array must have a length equal to that of the input array.' );
			}
			for ( i = 0; i < len; i++ ) {
				arrVal = clbk( arr[ i ], i, 0 );
				if ( typeof arrVal === 'number' ) {
					out[ i ] = GEQ( arrVal, y[ i ] );
				} else {
					out[ i ] = NaN;
				}
			}
		} else if ( isArrayLike( y ) && !isString ( y ) ) {
			if ( len !== y.length ) {
				throw new Error( 'geq()::invalid input argument. Comparator array must have a length equal to that of the input array.' );
			}
			if ( !isObject( y[ 0 ] ) ) {
				// Guess that y is a primitive array -> callback does not have to be applied
				for ( i = 0; i < len; i++ ) {
					arrVal = clbk( arr[ i ], i, 0 );
					if ( ( typeof y[ i ] === 'number' || typeof y[ i ] === 'string' ) && ( typeof arrVal === 'number' || typeof arrVal === 'string' ) ) {
						out[ i ] = GEQ( arrVal, y[ i ] );
					} else {
						out[ i ] = NaN;
					}
				}
			} else {
				// y is an object array, too -> callback is applied
				for ( i = 0; i < len; i++ ) {
					arrVal = clbk( arr[ i ], i, 0 );
					yVal = clbk( y[ i ], i, 1 );
					if ( ( typeof yVal === 'number' || typeof yVal === 'string' ) && ( typeof arrVal === 'number' || typeof arrVal === 'string' ) ) {
						out[ i ] = GEQ( arrVal, yVal );
					} else {
						out[ i ] = NaN;
					}
				}
			}
		} else {
			if ( typeof y === 'number' || typeof y === 'string' ) {
				for ( i = 0; i < len; i++ ) {
					arrVal = clbk( arr[ i ], i );
					if ( typeof arrVal === 'number' || typeof arrVal === 'string' ) {
						out[ i ] = GEQ( arrVal, y );
					} else {
						out[ i ] = NaN;
					}
				}
			} else {
				for ( i = 0; i < len; i++ ) {
					out[ i ] = NaN;
				}
			}
		}
		return out;
} // end FUNCTION geq()


// EXPORTS //

module.exports = geq;
