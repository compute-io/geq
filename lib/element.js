'use strict';

// GREATER THAN OR EQUAL TO //

/**
* FUNCTION: geq( x, y )
*	Checks whether input element x is greater than y
*
* @param {Number|String} x - input value
* @param {Number|String} y - comparator
* @returns {Number} 1 if x is greater than or equal to y, 0 otherwise
*/
function geq( x, y ) {
		return x >= y ? 1 : 0;
} // end FUNCTION geq()

// EXPORTS //

module.exports = geq;
