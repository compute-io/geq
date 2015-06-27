'use strict';

// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' );

// FUNCTIONS //

var GEQ = require( './element.js' );


// GREATER THAN OR EQUAL TO //

/**
* FUNCTION: geq( out, x, y )
*	Computes an element-wise comparison (greater than or equal to) of a matrix
*
* @param {Matrix} out - output matirx
* @param {Matrix} x - input matrix
* @param {Matrix|Number} y - either a matrix of equal dimensions or a number / string
* @returns {Matrix} output matrix of 1s and 0s, where a `1` indicates that an input element is greater or equal to a compared value and `0` indicates that an input element is less than a compared value
*/
function geq( out, x, y ) {
	var len = x.length,
		i, j,
		M, N;

	if ( out.length !== len ) {
		throw new Error( 'geq()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	if ( isMatrixLike( y ) ) {
		M = x.shape[0];
		N = x.shape[1];
		if ( M !== x.shape[0] || N !== y.shape[1] ) {
			throw new Error( 'geq()::invalid input arguments. Matrix to be compared must have the same number of rows and columns as the input matrix.' );
		}
		for ( i = 0; i < M; i++ ) {
			for ( j = 0; j < N; j++ ) {
				out.set( i, j, GEQ( x.get( i, j ), y.get( i, j ) ) );
			}
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			out.data[ i ] = GEQ( x.data[ i ], y );
		}
	}
	return out;
} // end FUNCTION geq()


// EXPORTS //

module.exports = geq;
