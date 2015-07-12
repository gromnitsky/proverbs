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
	    },
	    id: []
	}, query.parse('this [foo] is a -[bar] [baz] query'))
    })

    test('empty', function() {
	assert.deepEqual({
	    query: "",
	    tags: {
		include: [],
		exclude: []
	    },
	    id: []
	}, query.parse(' '))
    })

    test('no tags', function() {
	assert.deepEqual({
	    query: "hello",
	    tags: {
		include: [],
		exclude: []
	    },
	    id: []
	}, query.parse('hello'))
    })

    test('only tags', function() {
	assert.deepEqual({
	    query: "",
	    tags: {
		include: ['hello', 'world'],
		exclude: []
	    },
	    id: []
	}, query.parse('[hello][world]'))
    })

    test('tags with spaces', function() {
	assert.deepEqual({
	    query: "",
	    tags: {
		include: ['hello world'],
		exclude: ['omg lol']
	    },
	    id: []
	}, query.parse('[hello world]-[omg  lol]'))
    })

    test('broken', function() {
	assert.deepEqual({
	    query: "try harder dude",
	    tags: {
		include: [],
		exclude: []
	    },
	    id: []
	}, query.parse('try harder [dude'))
    })

    test('tags, id, query', function() {
	assert.deepEqual({
	    query: "goodbye cruel",
	    tags: {
		include: ['hello', 'world'],
		exclude: []
	    },
	    id: [1234]
	}, query.parse('goodbye [hello] cruel [world] [:1234]'))
    })

    test('2 IDs', function() {
	assert.deepEqual({
	    query: "",
	    tags: {
		include: [],
		exclude: []
	    },
	    id: [1234, 5678]
	}, query.parse('[:1234][:5678]'))
    })

})
