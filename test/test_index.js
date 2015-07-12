'use strict';

let assert = require('assert')
let fs = require('fs')
let path = require('path')

let out = path.resolve(process.env.TEST_MOCHA_OUT)
let dir = process.env.TEST_MOCHA_DIR

let Index = require('../src/index.js')

suite('index', function() {

    setup(function() {
	// load index
	let stale = JSON.parse(fs.readFileSync(path.join(out, 'test/data/index.json')).toString())
	this.data = JSON.parse(fs.readFileSync(path.join(out, 'src/data.json')).toString())
	this.index = new Index(this.data, false)
	this.index.load(stale)
    })

    test('search_in_tags', function() {
	let r = Index.search_in_tags(this.data, {
	    query: '',
	    tags: {
		include: ['ukrainian'],
		exclude: ['drink']
	    }
	})
	assert.equal(3, r.length)
    })

    test('search_in_tags empty', function() {
	let r = Index.search_in_tags(this.data, {
	    query: '',
	    tags: {
		include: [],
		exclude: []
	    }
	})
	assert(r.length > 10000)
    })

    test('with 1 exclude', function() {
	let r = this.index.search("ukraine -[drink]")
	assert.equal(3, r.length)
    })

    test('with 1 include', function() {
	let r = this.index.search("ukraine [love]")
//	console.log(r)
	assert.equal(2, r.length)
    })

    test('empty', function() {
	let r = this.index.search("")
	assert.equal(0, r.length)
    })

    test('2 chars', function() {
	let r = this.index.search("lo")
	assert.equal(0, r.length)
    })

    test('1 tag', function() {
	let r = this.index.search("[ukrainian]")
	assert.equal(4, r.length)
    })

    // a union
    test('2 tags', function() {
	let r = this.index.search("[ukrainian][drink]")
//	console.log(r)
	assert.equal(37, r.length)
    })

    test('1 include 1 exclude', function() {
	let r = this.index.search("-[ukrainian][drink]")
//	console.log(r)
	assert.equal(33, r.length)
    })

    test('str with 1 include 1 exclude', function() {
	let r = this.index.search("-[ukrainian][drink] one")
//	console.log(r)
	assert.equal(4, r.length)
    })

    test('search via lunr only', function() {
	let r = this.index.search("roman")
	assert(r.length > 1000)
    })

    test('search via tags', function() {
	let r = this.index.search("[roman]")
	assert(r.length > 1000)
    })

    test('1 tag, 2 IDs', function() {
	let r = this.index.search("[ukrainian] [:3876] [:12]")
	assert.equal(2, r.length)
	assert(r[0].p.match(/the tavern is far/))
    })

})
