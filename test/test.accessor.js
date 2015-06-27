/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	geq = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor geq', function tests() {

	it( 'should export a function', function test() {
		expect( geq ).to.be.a( 'function' );
	});

	it( 'should compare array elements element-wise to a scalar using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':2},
			{'x':4},
			{'x':6}
		];
		actual = new Array( data.length );
		actual = geq( actual, data, 3, getValue );

		expected = [
			0,
			0,
			1,
			1
		];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should compare array elements to elements of another array using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [
			3,
			2,
			1,
			0
		];

		actual = new Array( data.length );
		actual = geq( actual, data, y, getValue );

		expected = [
			0,
			0,
			1,
			1
		];

		assert.deepEqual( actual, expected );

		function getValue( d, i ) {
			return d.x;
		}

	});

	it( 'should compare elements of two object arrays using an accessor', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':4},
			{'x':2},
			{'x':8}
		];

		y = [
			{'y':2},
			{'y':1},
			{'y':4},
			{'y':2}
		];

		actual = new Array( data.length );
		actual = geq( actual, data, y, getValue );

		expected = [
			0,
			1,
			0,
			1
		];

		assert.deepEqual( actual, expected );

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should return empty array if provided an empty array', function test() {
		assert.deepEqual( geq( [], [], 1, getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		data = [
			{'x':1},
			{'x':null},
			{'x':3}
		];
		actual = new Array( data.length );
		actual = geq( actual, data, 2, getValue );

		expected = [ 0, NaN, 1 ];

		assert.deepEqual( actual, expected );

		// single non-numeric value
		y = false;
		actual = new Array( data.length );
		actual = geq( actual, data, y, getValue );
		expected = [ NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		// numeric array
		y = [ 1, 2, 3 ];
		actual = new Array( data.length );
		actual = geq( actual, data, y, getValue );
		expected = [ 1, NaN, 1 ];

		// typed array
		y = new Int32Array( [1,2,3] );
		actual = new Array( data.length );
		actual = geq( actual, data, y, getValue );
		expected = [ 1, NaN, 1 ];

		assert.deepEqual( actual, expected );

		// object array
		y = [
			{'y':1},
			{'y':2},
			{'y':3}
		];
		actual = new Array( data.length );
		actual = geq( actual, data, y, getValue2 );
		expected = [ 1, NaN, 1 ];

		function getValue( d, i ) {
			return d.x;
		}

		function getValue2( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should throw an error if comparing to an array which is not of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			geq( [], [1,2], [1,2,3], getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

	it( 'should throw an error if comparing to a typed array which is not of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			geq( [], [1,2], new Int32Array( [1,2,3] ), getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

});
