/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate if a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	geq = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-geq', function tests() {

	it( 'should export a function', function test() {
		expect( geq ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid accessor option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				geq( [1,2,3], 1, {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided a number / string as the first argument and a not-applicable option', function test() {
		var values = [
			{'accessor': function getValue( d ) { return d; } },
			{'copy': false},
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				geq( 12, [1,2,3], value );
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number or string nor array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( geq( values[ i ], 1 ) ) );
		}
	});


	it( 'should return NaN if the first argument is a number/string and the second argument is neither a number/string nor array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( geq( 8, values[ i ] ) ) );
		}
	});

	it( 'should compare two strings', function test() {
		assert.strictEqual( geq( 'C', 'Z' ), 0 );
		assert.strictEqual( geq( 'A', 'a'  ), 0 );
	});

	it( 'should compare two numbers', function test() {
		assert.strictEqual( geq( 3, 2 ), 1 );
		assert.strictEqual( geq( 0, 10  ), 0 );
	});

	it( 'should compare a string and a number', function test() {
		assert.strictEqual( geq( '2', 3 ), 0 );
		assert.strictEqual( geq( 10, '11'  ), 0 );
	});

	it( 'should calculate the comparison between a number with an array', function test() {
		var data, actual, expected;
		data = [ 3, 8 ];
		actual = geq( 4, data );
		expected = [ 1, 0 ];
		assert.deepEqual( actual, expected );
	});

	it( 'should calculate the comparison of a scalar with a matrix', function test() {
		var data, actual, expected;
		data = matrix( new Int8Array( [ 1,2,3,4 ] ), [2,2] );
		actual = geq( 2, data );
		expected = matrix( new Uint8Array( [1,1,0,0] ), [2,2] );

		assert.deepEqual( actual.data, expected.data );
	});

	it( 'should perform an element-wise comparison when provided a plain array and a scalar or other array', function test() {
		var data, expected, actual;

		data = [ 4, 5, 3, 6, 8 ];

		// Single numeric comparator:
		actual = geq( data, 4 );
		expected = [ 1, 1, 0, 1, 1 ];

		assert.deepEqual( actual, expected );

		// Array of numeric values:
		actual = geq( data, [ 5, 5, 5, 5, 9 ] );
		expected = [ 0, 1, 0, 1, 0 ];

		assert.deepEqual( actual, expected );

		// Strings:
		actual = geq( data, '5' );
		expected = [ 0, 1, 0, 1, 1 ];

		assert.deepEqual( actual, expected );

		data = [ 'a', 'aa', 'aaa', 'b' ];

		actual = geq( data, 'aa' );
		expected = [ 0, 1, 1, 1 ];

		assert.deepEqual( actual, expected );

		actual = geq( data, [ 'aa', 'bb', 'aa', 'c' ] );
		expected = [ 0, 0, 1, 0 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should not mutate an input array by default', function test() {
		var data, actual;

		data = [ 4, 5, 3, 6, 8 ];
		actual = geq( data, 4 );

		assert.ok( data !== actual );
	});

	it( 'should mutate an input array if the `copy` option is `false`', function test() {
		var data, expected, actual;

		data = [ 4, 5, 3, 6, 8 ];

		actual = geq( data, 4, {
			'copy': false
		});
		expected = [ 1, 1, 0, 1, 1 ];

		assert.ok( data === actual );
		assert.deepEqual( actual, expected );
	});

	it( 'should perform an element-wise comparison when provided a typed array and a scalar', function test() {
		var data, actual, expected;

		data = new Int8Array( [ 0, 1, 2, 3 ] );

		expected = new Uint8Array( [
			0,
			1,
			1,
			1,
		]);

		actual = geq( data, 1 );
		assert.notEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Mutate:
		actual = geq( data, 1, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		expected = new Int8Array( [ 0, 1, 1, 1 ] );

		assert.deepEqual( data, expected );
	});

	it( 'should perform an element-wise comparison when provided a typed array and another typed array', function test() {
		var data, actual, expected;

		data = new Int8Array( [ 1, 2, 3, 4 ] );

		expected = new Uint8Array( [
			1,
			1,
			1,
			1
		]);

		actual = geq( data, data );
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );

		// Mutate:

		actual = geq( data, data, {
			'copy': false
		});
		expected = new Int8Array( [ 1, 1, 1, 1 ] );
		assert.strictEqual( actual, data );

		assert.deepEqual( data, expected );
	});

	it( 'should correctly compare values using an accessor', function test() {
		var data, expected, actual;

		data = [
			[1,4],
			[2,5],
			[3,3],
			[4,6],
			[5,8]
		];

		// Single numeric comparator:
		actual = geq( data, 4, {
			'accessor': function getValue( d ) {
				return d[ 1 ];
			}
		});
		expected = [ 1, 1, 0, 1, 1 ];

		assert.deepEqual( actual, expected );

		// Single string comparator:
		data = [
			{'x': 'a'},
			{'x': 'aa'},
			{'x': 'aaa'},
			{'x': 'b'}
		];

		actual = geq( data, 'aa', {
			'accessor': function getValue( d ) {
				return d.x;
			}
		});
		expected = [ 0, 1, 1, 1 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should correctly compare values when provided a comparison array and using an accessor', function test() {
		var data, arr, expected, actual;

		data = [
			[1,4],
			[2,5],
			[3,3],
			[4,6],
			[5,8]
		];

		arr = [ 5, 5, 5, 5, 9 ];

		actual = geq( data, arr, {
			'accessor': function getValue( d ) {
				return d[ 1 ];
			}
		});
		expected = [ 0, 1, 0, 1, 0 ];

		// String comparator:
		arr = [ '5', '5', '5', '5', '9' ];

		actual = geq( data, arr, {
			'accessor': function getValue( d ) {
				return d[ 1 ];
			}
		});

		expected = [ 0, 1, 0, 1, 0 ];
		assert.deepEqual( actual, expected );

		// Both arrays are accessed:
		arr = [
			{'x':5},
			{'x':5},
			{'x':5},
			{'x':5},
			{'x':9}
		];

		actual = geq( data, arr, {
			'accessor': function getValue( d, i, j ) {
				if ( j === 0 ) {
					return d[ 1 ];
				}
				return d.x;
			}
		});
		expected = [ 0, 1, 0, 1, 0 ];

		// Both arrays are accessed & string comparator:
		arr = [
			{'x':'5'},
			{'x':'5'},
			{'x':'5'},
			{'x':'5'},
			{'x':'9'}
		];

		actual = geq( data, arr, {
			'accessor': function getValue( d, i, j ) {
				if ( j === 0 ) {
					return d[ 1 ];
				}
				return d.x;
			}
		});
		expected = [ 0, 1, 0, 1, 0 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should perform an element-wise comparison when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Uint8Array( 100 );
		d2 = new Uint8Array( 100 );
		d3 = new Uint8Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = i >= 50 ? 1 : 0;
			d3[ i ] = 1;
		}

		// Compare matrix with scalar
		mat = matrix( d1, [10,10], 'uint8' );
		out = geq( mat, 50 );

		assert.deepEqual( out.data, d2 );

		// Compare two matrices element-wise
		mat = matrix( d1, [10,10], 'uint8' );
		out = geq( mat, mat );

		assert.deepEqual( out.data, d3 );

		// Compare matrix with scalar and mutate...
		out = geq( mat, 50, {
			'copy': false
		});

		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

});
