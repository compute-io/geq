'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isNumber = require( 'validate.io-number-primitive' ),
	isString = require( 'validate.io-string-primitive' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' ),
	isObject = require( 'validate.io-object' );


// GREATER THAN OR EQUAL TO //

/**
* FUNCTION: geq( arr, x[, opts] )
*	Computes an element-wise comparison (greater than or equal to) of an array.
*
* @param {Number[]|Array} arr - input array
* @param {Number[]|Array|Number|String} x - comparator
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating whether to return a new array
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @returns {Number[]} array of 1s and 0s, where a `1` indicates that an input array element is greater than or equal to a compared value and `0` indicates that an input array element is not greater than or equal to a compared value
*/
function geq( arr, x, opts ) {
	var isArr = isArray( x ),
		copy = true,
		arity,
		clbk,
		out,
		len,
		i;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'geq()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( !isArr && !isNumber( x ) && !isString( x ) ) {
		throw new TypeError( 'geq()::invalid input argument. Comparison input must either be an array, number primitive, or string primitive. Value: `' + x + '`.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'geq()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'geq()::invalid option. Copy option must be a boolean primitive. Option: `' + copy + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'geq()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
			}
			arity = clbk.length;
		}
	}
	len = arr.length;
	if ( copy ) {
		out = new Array( len );
	} else {
		out = arr;
	}
	// Case 1: comparison array
	if ( isArr ) {
		if ( len !== x.length ) {
			throw new Error( 'geq()::invalid input argument. Comparison array must have a length equal to that of the input array.' );
		}
		if ( arity === 3 ) { // clbk implied
			for ( i = 0; i < len; i++ ) {
				if ( clbk( arr[i], i, 0 ) >= clbk( x[i], i, 1 ) ) {
					out[ i ] = 1;
				} else {
					out[ i ] = 0;
				}
			}
		}
		else if ( clbk ) {
			for ( i = 0; i < len; i++ ) {
				if ( clbk( arr[i], i ) >= x[ i ] ) {
					out[ i ] = 1;
				} else {
					out[ i ] = 0;
				}
			}
		}
		else {
			for ( i = 0; i < len; i++ ) {
				if ( arr[ i ] >= x[ i ] ) {
					out[ i ] = 1;
				} else {
					out[ i ] = 0;
				}
			}
		}
	}
	// Case 2: accessor and single comparator
	else if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			if ( clbk( arr[ i ], i ) >= x ) {
				out[ i ] = 1;
			} else {
				out[ i ] = 0;
			}
		}
	}
	// Case 3: single comparator
	else {
		for ( i = 0; i < len; i++ ) {
			if ( arr[ i ] >= x ) {
				out[ i ] = 1;
			} else {
				out[ i ] = 0;
			}
		}
	}
	return out;
} // end FUNCTION geq()


// EXPORTS //

module.exports = geq;
