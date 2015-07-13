'use strict';
/* global angular */

// for old browsers (IE12, Android 4.4, etc.)
require("babel/polyfill")

let meta = require('./package.json')
let tags = require('./tags')
let Index = require('./index')

let http_err2str = function(err) {
    if (err instanceof Error) {
	return err.message
    } else if (angular.isObject(err)) {
	return `${err.config.method} ${err.config.url}: ${err.status} ${err.statusText}`
    } else {
	return err
    }
}

let services = angular.module('proverbs.services', [])
let app = angular.module('ProverbsApp', [
    'ngRoute',
    'proverbs.services'
])

app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
	.when('/search', {
	    templateUrl: 'template.search',
	    controller: "SearchCtrl"
	})
	.when('/tags', {
	    templateUrl: 'template.tags',
	    controller: "TagsCtrl"
	})
	.otherwise({
	    redirectTo: () => '/search?q=love'
	})
}])

// shared memory between controllers
let sm = function() {
    return {
	status: {
	    msg: '',
	    ready_ui: function() {
		return this.msg === ''
	    }
	},
	tags: []
    }
}
services.factory('sm', sm)

// reachs out to the outer scope to grab a sibling <td> with a proverb
// text
let copyToClipboard = function($timeout) {
    let link = function(scope, element, attrs) {
	let tr = element.parent("tr")
	let proverb = $(".my-proverb", tr)

	element.bind('click', function() {
	    console.log(proverb.text())
	    angular.element(proverb).addClass('my-proverb-active')
	    $timeout( () => angular.element(proverb).removeClass('my-proverb-active'), 200)

	    let clipboard = document.getElementById('clipboard')
	    clipboard.value = proverb.text()
	    clipboard.select()
	    document.execCommand("copy", false, null)
	    // remove focus from textarea element
	    document.querySelector('body').focus()
	})
    }

    return {
	link: link,
	restrict: 'A'
    }
}
app.directive('copyToClipboard', copyToClipboard)
copyToClipboard.$inject = ['$timeout']


let grabFocus = function($timeout) {
    let link = function(scope, element, attrs) {
//	console.log(scope.grabFocusWhen)
	if (scope.grabFocusWhen) element.focus()
    }

    return {
	link: link,
	scope: {
	    grabFocusWhen: '='
	},
	restrict: 'A'
    }
}
app.directive('grabFocus', grabFocus)
grabFocus.$inject = ['$timeout']


let MainCtrl = function($scope, $http, $q, sm) {
    $scope.load_data = function() {
	sm.status.msg = 'Loading data...'
	$http.get('data.json')
	    .then( (r) => {
		sm.index = new Index(r.data, true)
		sm.status.ready.resolve(true)
		sm.status.msg = ''
		console.info('MainCtrl: load_data() ok')
	    })
	    .catch( (err) => {
		sm.ready.reject(http_err2str(err))
		sm.status.msg = http_err2str(err)
	    });
    }

    // Init
    $scope.bo = tags.bo
    $scope.meta = meta
    $scope.sm = sm
    // child controller can check this to determine if the UI is ready
    sm.status.ready = $q.defer()
    $scope.load_data()
}
app.controller('MainCtrl', MainCtrl)
MainCtrl.$inject = ['$scope', '$http', '$q', 'sm']


let SearchCtrl = function($scope, $location, $window, sm) {
    $scope.search = function() {
	$scope.search_results = sm.index.search($scope.query.value)
	$window.scrollTo(0, 0)
    }

    $scope.update_location = function() {
	$location.search({q: $scope.query.value, 'm': 1})
    }

    $scope.is_mode_manual = () => $location.search().m === 1

    // Init
    $scope.template_search_form_url = 'template.search_form'
    $scope.template_proverb_table_url = 'template.proverb_table'
    $scope.search_results = []
    $scope.sm = sm
    $scope.$parent.nav_current = 'search'
    $scope.query = { value: '' }
    if ('q' in $location.search()) {
	$scope.query.value = $location.search().q
	sm.status.ready.promise.then(function(ok) {
	    console.info('SearchCtrl: sm.status.ready ok')
	    $scope.search()
	})
    }
}
app.controller('SearchCtrl', SearchCtrl)
SearchCtrl.$inject = ['$scope', '$location', '$window', 'sm']


let TagsCtrl = function($scope, sm) {
    // Init
    $scope.sm = sm
    $scope.$parent.nav_current = 'tags'
    $scope.query = ''

    sm.status.ready.promise.then(function(ok) {
	console.info('TagsCtrl: sm.status.ready ok')
	if (sm.tags.length === 0) {
	    sm.tags = tags.misc(sm.index.data)
	    console.info('TagsCtrl: tags.misc()')
	}
    })
}
app.controller('TagsCtrl', TagsCtrl)
TagsCtrl.$inject = ['$scope', 'sm']
