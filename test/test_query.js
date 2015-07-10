'use strict';

let assert = require('assert')
let fs = require('fs')
let path = require('path')

let out = path.resolve(process.env.TEST_MOCHA_OUT)
let dir = process.env.TEST_MOCHA_DIR

let query = require('../src/query.js')

suite('query', function() {

    setup(function() {
    })

    test('smoke', function() {
	assert.deepEqual({
	    query: "this is a query",
	    tags: {
		include: ['foo', 'baz'],
		exclude: ['bar']
	    }
	}, query.parse('this [foo] is a -[bar] [baz] query'))
    })

    test('empty', function() {
	assert.deepEqual({
	    query: "",
	    tags: {
		include: [],
		exclude: []
	    }
	}, query.parse(' '))
    })

    test('no tags', function() {
	assert.deepEqual({
	    query: "hello",
	    tags: {
		include: [],
		exclude: []
	    }
	}, query.parse('hello'))
    })

    test('only tags', function() {
	assert.deepEqual({
	    query: "",
	    tags: {
		include: ['hello', 'world'],
		exclude: []
	    }
	}, query.parse('[hello][world]'))
    })

    test('tags with spaces', function() {
	assert.deepEqual({
	    query: "",
	    tags: {
		include: ['hello world'],
		exclude: ['omg lol']
	    }
	}, query.parse('[hello world]-[omg  lol]'))
    })

    test('broken', function() {
	assert.deepEqual({
	    query: "try harder dude",
	    tags: {
		include: [],
		exclude: []
	    }
	}, query.parse('try harder [dude'))
    })

})
