'use strict';

let fs = require('fs')

let lunr = require('lunr')

let query = require('./query')


let search_in_array = function(arr, str) {
    let index = -1;
    arr.some(function(element, idx) {
	if (str.toLowerCase() === element.toLowerCase()) {
	    index = idx
	    return true
	}
    })

    return index
}

class Index {
    constructor(data, autogenerate) {
	this.data = data
	if (autogenerate) this.generate()
    }

    load(stale) {
	this.index = lunr.Index.load(stale)
    }

    generate() {
	this.index = lunr(function () {
	    this.field('p')
	    this.field('t', 10)
	    this.field('bo', 5)
	    this.ref('id')
	})

	for (let item of this.data) {
	    this.index.add(item)
	}
    }

    search(str) {
	let r = []
	let uq = query.parse(str)

	for (let idx of uq.id) {
	    let row = this.data[idx]
	    r.push(row)
	}
	if (r.length > 0) return r

	if (uq.query.length <= 2) {
	    if (uq.tags.include.length === 0 && uq.tags.exclude.length === 0) {
		return r
	    } else {
		return Index.search_in_tags(this.data, uq)
	    }
	}

	let search = this.index.search(uq.query)
//	console.log(`query: '${str}' ${search.length}`)
	for (let idx in search) {
	    let row = this.data[search[idx].ref]
	    r.push(row)
	}

	return Index.search_in_tags(r, uq)
    }

    static filter_by_included(data, uq) {
	if (uq.tags.include.length === 0) return data
	return data.filter(function(row) {
	    for (let tag of uq.tags.include) {
		if (search_in_array(row.t, tag) !== -1) {
		    return true
		}
	    }
	    return false
	})
    }

    static filter_by_excluded(data, uq) {
	if (uq.tags.exclude.length === 0) return data
	return data.filter(function(row) {
	    for (let tag of uq.tags.exclude) {
		if (search_in_array(row.t, tag) !== -1) {
		    return false
		}
	    }
	    return true
	})
    }

    static search_in_tags(data, uq) {
	let included = Index.filter_by_included(data, uq)
	return Index.filter_by_excluded(included, uq)
    }
}

module.exports = Index
