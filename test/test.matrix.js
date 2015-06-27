/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	geq = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix geq', function tests() {

	var out,
		mat, mat2,
		d1,
		d2,
		d3,
		i;

	d1 = new Float64Array( 25 );
	d2 = new Float64Array( 25 );
	d3 = new Float64Array( 25 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i;
		d2[ i ] = 10;
		d3[ i ] = i >= 10 ? 1 : 0;
	}

	beforeEach( function before() {
		mat = matrix( d1, [5,5], 'float64' );
		mat2 = matrix( d2, [5,5], 'float64' );
		out = matrix( d3, [5,5], 'float64' );
	});

	it( 'should export a function', function test() {
		expect( geq ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided matrices of different dimensions', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			geq( matrix( [10,10] ), mat, 1 );
		}
	});

	it( 'should throw an error if provided a comparator matrix which is not of equal length to the input matrix', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			geq( matrix( [5,5] ), mat, matrix( [10,10] ) );
		}
	});

	it( 'should compare each matrix element to a scalar', function test() {
		var actual;

		actual = matrix( [5,5], 'float64' );
		actual = geq( actual, mat, 10 );

		assert.deepEqual( actual.data, out.data );
	});

	it( 'should compare two matrices with each other element-wise', function test() {
		var actual;

		actual = matrix( [5,5], 'float64' );
		actual = geq( actual, mat, mat2 );

		assert.deepEqual( actual.data, out.data );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( geq( out, mat, 1 ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( geq( out, mat, 1 ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( geq( out, mat, 1 ).data, expected );
	});

});
