/*
  FIXME: rewrite this using jison or pegjs
*/

'use strict';

let normalize = function(str) {
    return str.replace(/[\[\]]/g, '').replace(/\s+/g, ' ').trim()
}

let getid = function(str) {
    let m = str.match(/^-?:([0-9]+)$/)
    return m ? parseInt(m[1]) : null
}

exports.parse = function(input) {
    let tags_regexp = /-?\[[a-zA-Z0-9-: ]+\]/g

    let query = ''
    let tags_include = []
    let tags_exclude = []
    let id = []
    let result = function () {
	return {
	    query: query,
	    tags: {
		include: tags_include,
		exclude: tags_exclude
	    },
	    id: id
	}
    }

    // get tags
    let m = input.match(tags_regexp)
    if (m) {
	for (let tag of m) {
	    tag = normalize(tag)
	    let cid = getid(tag)
	    if (cid !== null) {
		id.push(cid)
		continue
	    }
	    if (tag[0] === '-') {
		tags_exclude.push(tag.slice(1))
	    } else {
		tags_include.push(tag)
	    }
	}
    }

    // get query
    query = normalize(input.replace(tags_regexp, ''))

    return result()
}
