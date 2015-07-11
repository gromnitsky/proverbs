'use strict';
/* global angular */

let query = require('./query')
let tags = require('./tags')

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

let MainCtrl = function($scope, $http) {
    $scope.load_data = function() {
	$http.get('data.json')
	    .then( (r) => {
		console.log(r)
		$scope.ready = true
	    })
	    .catch( (err) => {
		$scope.status = http_err2str(err)
		console.log(err)
	    });
    }

    // Init
    $scope.ready = false
    $scope.load_data()
}
app.controller('MainCtrl', MainCtrl)
MainCtrl.$inject = ['$scope', '$http']

let SearchCtrl = function($scope) {
    $scope.$parent.nav_current = 'search'
}
app.controller('SearchCtrl', SearchCtrl)
SearchCtrl.$inject = ['$scope']

let TagsCtrl = function($scope) {
    $scope.$parent.nav_current = 'tags'
}
app.controller('TagsCtrl', TagsCtrl)
TagsCtrl.$inject = ['$scope']
