geq
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes an element-wise comparison (greater than or equal to).


## Installation

``` bash
$ npm install compute-geq
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var geq = require( 'compute-geq' );
```

#### geq( x, y[, opts] )

Computes an element-wise comparison (greater than or equal to). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). `y` has to be either an `array` or `matrix` of equal dimensions as `x`, a `string` or a `number`. Correspondingly, the function returns either an `array` with length equal to that of the input `array`, a `matrix` with equal dimensions as input `x` or a single value. Each output element is either `0` or `1`. A value of `1` means that an element is greater than or equal to the compared value  and `0` means that an element is __not__ greater than or equal to the compared value.

``` javascript
var matrix = require( 'dstructs-matrix' ),
    data,
    y,
    mat,
    out,
    i;

data = [ 5, 3, 8, 3, 2 ];

// Single comparison value:
out = geq( data, 3 );
// returns [ 1, 1, 1, 1, 0 ]

out = geq( 3, data )
// returns [ 0, 0, 0, 1, 1 ]

// Array of comparison values:
out = geq( data, [ 5, 2, 8, 7, 3 ] );
// returns [ 1, 1, 1, 0, 0 ]

// Matrices
data = new Int32Array( 9 );
y = new Int32Array( 9 )
for ( i = 0; i < 9; i++ ) {
	data[ i ] = i;
	y[ i ] = 8 - i;
}
mat = matrix( data, [3,3], 'float64' );
/*
	[ 0 1 2
	  3 4 5
	  6 7 8 ]
*/

// Single comparison value:
out = geq( mat, 3 );
/*
	[ 0 0 0
	  1 1 1
	  1 1 1 ]
*/

// Matrix of comparison values:
out = geq( mat, y );
/*
	[ 0 0 0
	  0 1 1
	  1 1 1 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.


For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = geq( data, 3, {
	'accessor': getValue
});
// returns [ 1, 1, 1, 1, 0 ]
```

When comparing values between two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 5],
	['boop', 3],
	['bip', 8],
	['bap', 3],
	['baz', 2]
];

var arr = [
	{'x': 4},
	{'x': 5},
	{'x': 6},
	{'x': 3},
	{'x': 3}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = geq( data, arr, {
	'accessor': getValue
});
// returns [ 1, 0, 1, 1, 0 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second (comparison) input `array`.

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ -10, -1, 0, 1, 10 ];

var out = geq( data, 0 {
	'copy': false
});
// returns [ 0, 0, 1, 1, 1 ]

bool = ( data === out );
// returns true

data = new Float64Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'float64' );
/*
	[  0  1
	   2  3
	   4  5 ]
*/

out = geq( mat, 3, {
	'copy': false
});
/*
	[  0 0
	   0 1
	   1 1 ]
*/

bool = ( mat === out );
// returns true
```

## Notes

*	If an element is __not__ a numeric value or string, the result of the comparison is `NaN`.

	``` javascript
		var data, out;

		out = geq( null, 1 );
		// returns NaN

		out = geq( true, 1 );
		// returns NaN

		out = geq( {'a':'b'}, 1 );
		// returns NaN

		out = geq( [ true, null, [] ], 1 );
		// returns [ NaN, NaN, NaN ]

		function getValue( d, i ) {
			return d.x;
		}
		data = [
			{'x':true},
			{'x':[]},
			{'x':{}},
			{'x':null}
		];

		out = geq( data, 1, {
			'accessor': getValue
		});
		// returns [ NaN, NaN, NaN, NaN ]
	```

*	When calling the function with a `number` or `string` as the first argument and a `matrix` or `array` as the second argument, the `options` object is not applicable.

	``` javascript
		var out = geq( 4, [ 1, 2, 3 ], {
			'copy': false
		});
		// Throws an error
	```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	geq = require( 'compute-geq' ),
	sum = require( 'compute-sum' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}
out = geq( data, 50 );

// Count the number of values greater than or equal to 50...
var count = sum( out );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = geq( data, 50, {
	'accessor': getValue
});

// Typed arrays...
data = new Float64Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*100 );
}
tmp = geq( data, 50 );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [10,10], 'float64' );
out = geq( mat, 50 );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-geq.svg
[npm-url]: https://npmjs.org/package/compute-geq

[travis-image]: http://img.shields.io/travis/compute-io/geq/master.svg
[travis-url]: https://travis-ci.org/compute-io/geq

[coveralls-image]: https://img.shields.io/coveralls/compute-io/geq/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/geq?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/geq.svg
[dependencies-url]: https://david-dm.org/compute-io/geq

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/geq.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/geq

[github-issues-image]: http://img.shields.io/github/issues/compute-io/geq.svg
[github-issues-url]: https://github.com/compute-io/geq/issues
