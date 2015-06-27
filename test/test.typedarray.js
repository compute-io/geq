/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	geq = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array geq', function tests() {

	it( 'should export a function', function test() {
		expect( geq ).to.be.a( 'function' );
	});

	it( 'should compare elements of two typed arrays (greater than or equal to)', function test() {
		var data, actual, expected, y;

		data = new Float64Array([
			12,
			6,
			4,
			3
		]);
		y = new Float64Array([
			4,
			9,
			4,
			5
		]);
		actual = new Uint8Array( data.length );

		actual = geq( actual, data, y );

		expected = new Uint8Array( [1,0,1,0] );

		assert.deepEqual( expected, actual );
	});

	it( 'should throw an error if provided two typed arrays of differing lengths', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			geq( new Array(2), new Int8Array( [1,2] ), new Int8Array( [1,2,3] ) );
		}

		expect( foo2 ).to.throw( Error );
		function foo2() {
			geq( new Array(2), new Int8Array( [1,2] ), [ 1, 2, 3 ] );
		}
	});

	it( 'should handle non-numeric y values by setting the respective element to NaN', function test() {
		var data, actual, expected, y;

		data = new Float64Array([
			1,
			2,
			3,
			4
		]);
		actual = new Array( data.length );
		actual = geq( actual, data, null );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		actual = new Array( data.length );
		y = [ 2, 2, 2, null ];
		actual = geq( actual, data, y );

		expected = [ 0, 1, 1, NaN ];

		assert.deepEqual( actual, expected );

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( geq( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
