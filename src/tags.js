'use strict';

// Big Origin to Small Origin
exports.bo = {
    'Europe': ['Spanish', 'Slavic', 'Italian', 'French', 'English', 'Ukrainian', 'German', 'Danish', 'St Augustine', 'Rumanian', 'Roman', 'Portuguese', 'Albanian', 'Greek', 'Irish', 'Welsh', 'Swedish', 'Norwegian', 'Dutch', 'Scottish', 'Polish', 'the Bible', 'Serbian', 'Catalan', 'Sicilian', 'Georgian', 'Estonian', 'Belgian', 'Icelandic', 'Swiss', 'Finnish', 'Croatian', 'Hungarian', 'Jesus', 'Czech', 'Maltese', 'St Paul', 'Bulgarian', 'Flemish', 'Christian', 'Lithuanian', 'Basque', 'Latvian', 'Bosnian', 'British'],
    'Middle East': ['Yiddish', 'Turkish', 'Moroccan', 'Lebanese', 'Egyptian', 'Ethiopian', 'Arabian', 'Kashmiri', 'Persian', 'Kurdish', 'Afghani', 'Urdu', 'Syrian', 'Ancient Sumerian', 'Yemeni', 'Libyan'],
    // TODO: split Asia
    'Asia': ['Chinese', 'Russian', 'Korean', 'Japanese', 'Tamil', 'Burmese', 'Filipino', 'Indian', 'Hindi', 'Vietnamese', 'Armenian', 'Malaysian', 'Siamese', 'Malay', 'Indonesian', 'Confucius', 'Malayan', 'Buddhist', 'Mongolian', 'Thai', 'Bengali', 'Tibetan', 'Punjabi', 'Hindu', 'Balinese', 'Laotian', 'Taoist', 'Samurai', 'Nepalese'],
    'Latin America': ['Guatemalan', 'Honduran', 'Mexican', 'Puerto Rican', 'Colombian', 'Brazilian', 'Ecuadorian', 'Argentine'],
    'Caribbean': ['Jamaican', 'Belizean'],
    'America': ['American', 'Poor Richard', 'American Army', 'Native American', 'The Editor'],
    'Africa': ['Zulu', 'Hausan', 'Swahili', 'African', 'Yoruban', 'Madagascan', 'Nigerian', 'West African', 'Tanzanian', 'Cambodian', 'Ugandan', 'Liberian', 'Singhalese', 'Kenyan', 'Rwandan', 'Sierra Leonean', 'Masai', 'Guinean', 'Ashanti', 'Somalian', 'Sudanese'],
    'Polynesia': ['Polynesian', 'Hawaiian', 'Fijian', 'Haitian', 'Maori'],
    'Wordwide': ['Unknown']
}

// Small Origin to Big Origin
let so_make = function(big_origin) {
    let r = {}
    for (let name in big_origin) {
	for (let place of big_origin[name]) {
	    if (!(place in r)) {
		r[place] = {
		    n: 1,
		    bo: name
		}
	    } else {
		r[place].n += 1
		r[place].bo = name
	    }
	}
    }
    return r
}

exports.so = so_make(exports.bo)

exports.bo_get = function(tags) {
    for (let tag of tags) {
	if (tag in exports.so) {
	    return exports.so[tag].bo
	}
    }
    throw new Error(`no Big Origin for ${tags}`)
}

// Misc are tags that are not BO or SO.
// Return a hash.
exports.misc = function(data) {
    let tags = {}
    for (let proverb in data) {
	for (let tag of data[proverb].t) {
	    if (!(tag in exports.so)) tags[tag] = tags[tag] + 1 || 1
	}
    }
    return tags
}
