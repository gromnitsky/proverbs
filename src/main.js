'use strict';
/* global angular */

let meta = require('./package.json')
let query = require('./query')
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
	    redirectTo: '/search'
	})
}])

// shared memory between controllers
let sm = function() {
    return {}
}
services.factory('sm', sm)

let MainCtrl = function($scope, $http, sm) {
    $scope.load_data = function() {
	$scope.status = 'Loading data...'
	$http.get('data.json')
	    .then( (r) => {
		console.log(r)
		sm.index = new Index(r.data)
		$scope.status = ''
	    })
	    .catch( (err) => {
		$scope.status = http_err2str(err)
		console.log(err)
	    });
    }

    $scope.ready = function() {
	return $scope.status === ''
    }

    // Init
    $scope.meta = meta
    $scope.load_data()
}
app.controller('MainCtrl', MainCtrl)
MainCtrl.$inject = ['$scope', '$http', 'sm']


let SearchCtrl = function($scope, sm) {
    $scope.$parent.nav_current = 'search'
}
app.controller('SearchCtrl', SearchCtrl)
SearchCtrl.$inject = ['$scope', 'sm']


let TagsCtrl = function($scope, sm) {
    $scope.$parent.nav_current = 'tags'
}
app.controller('TagsCtrl', TagsCtrl)
TagsCtrl.$inject = ['$scope', 'sm']
