/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	geq = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array geq', function tests() {

	it( 'should export a function', function test() {
		expect( geq).to.be.a( 'function' );
	});

	it( 'should compare an array to a scalar', function test() {
		var data, actual, expected;

		data = [
			2,
			4,
			6,
			8,
			10
		];
		actual = new Array( data.length );

		actual = geq( actual, data, 6 );

		expected = [
			0,
			0,
			1,
			1,
			1
		];

		assert.deepEqual( actual, expected );

		// Typed arrays...
		data = new Int32Array( data );
		actual = new Int32Array( data.length );

		actual = geq( actual, data, 6 );
		expected = new Int32Array( expected );

		assert.deepEqual( actual, expected );
	});

	it( 'should compare an array element-wise to another array', function test() {
		var data, actual, expected, y;

		data = [
			1,
			2,
			3,
			4,
			5
		];

	 	y = [
			5,
			4,
			3,
			2,
			1
		];
		actual = new Array( data.length );

		actual = geq( actual, data, y );

		expected = [
			0,
			0,
			1,
			1,
			1
		];

		assert.deepEqual( actual, expected );

		// Typed arrays...
		data = new Int32Array( data );
		actual = new Int32Array( data.length );

		actual = geq( actual, data, y );
		expected = new Int32Array( expected );

		assert.deepEqual( actual, expected );

		// y being a typed array
		y = new Int32Array( y );
		actual = geq( actual, data, y );
		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( geq( [], [], 1 ), [] );
		assert.deepEqual( geq( new Int8Array(), new Int8Array(), 1 ), new Int8Array() );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = geq( actual, data, 1 );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		actual = new Array( data.length );
		y = [ 1, 2, 3, 4 ];
		actual = geq( actual, data, y );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		data = [ 1, 2, 3 ];
		y = null;
		actual = new Array( data.length );
		actual = geq( actual, data, y );
		expected = [ NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		data = [ 1, null, 3 ];
		y = new Int32Array( [2,2,2] );
		actual = new Array( data.length );
		actual = geq( actual, data, y );
		expected = [ 0, NaN, 1 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should throw an error if provided an array to be compared which is not of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			geq( [], [1,2], [1,2,3] );
		}

		expect( foo2 ).to.throw( Error );
		function foo2() {
			geq( [], [1,2], new Int32Array( [1,2,3] ) );
		}
	});

});
