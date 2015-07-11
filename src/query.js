/*
  FIXME: rewrite this using jison or pegjs
*/

'use strict';

let normalize = function(str) {
    return str.replace(/[\[\]]/g, '').replace(/\s+/g, ' ').trim()
}

exports.parse = function(input) {
    let tags_regexp = /-?\[[a-zA-Z0-9- ]+\]/g

    let query = ''
    let tags_include = []
    let tags_exclude = []
    let result = function () {
	return {
	    query: query,
	    tags: {
		include: tags_include,
		exclude: tags_exclude
	    }
	}
    }

    // get tags
    let m = input.match(tags_regexp)
    if (m) {
	for (let tag of m) {
	    tag = normalize(tag)
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
