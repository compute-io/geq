/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	geq = require( './../lib/element.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'element geq', function tests() {

	it( 'should export a function', function test() {
		expect( geq ).to.be.a( 'function' );
	});

	it( 'should correctly compare different values', function test() {
		assert.strictEqual( geq( 2, 4 ), 0 );
		assert.strictEqual( geq( 2, 2 ), 1 );

		assert.strictEqual( geq( 900, 800 ), 1 );
		assert.strictEqual( geq( 900, 900 ), 1 );

		assert.strictEqual( geq( 'A', 'C' ), 0 );
		assert.strictEqual( geq( 'A', 'A'), 1 );

		assert.strictEqual( geq( 'c', 'C' ), 1 );
		assert.strictEqual( geq( 'c', 'c' ), 1 );
	});

});
