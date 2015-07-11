'use strict';
/* global angular */

let query = require('./query')
let tags = require('./tags')

let services = angular.module('proverbs.services', [])
let app = angular.module('proverbs', [
    'ngRoute',
    'proverbs.services'
])

app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider
	.when('/about', {
	    templateUrl: 'template.main',
	    controller: "AboutCtrl"
	})
	.when('/search', {
	    templateUrl: 'template.main',
	    controller: "SearchCtrl"
	})
	.when('/tags', {
	    templateUrl: 'template.main',
	    controller: "TagsCtrl"
	})
	.otherwise({
	    redirectTo: '/about'
	})
}])

let AboutCtrl = function($scope, $location) {
    $scope.template_body = 'template.about'
}
app.controller('AboutCtrl', AboutCtrl)
AboutCtrl.$inject = ['$scope', '$location']

let SearchCtrl = function($scope, $location) {
    $scope.template_body = 'template.search'
}
app.controller('SearchCtrl', SearchCtrl)
SearchCtrl.$inject = ['$scope', '$location']

let TagsCtrl = function($scope, $location) {
    $scope.template_body = 'template.tags'
}
app.controller('TagsCtrl', TagsCtrl)
TagsCtrl.$inject = ['$scope', '$location']


let bootstrap_angular = function() {
    angular.bootstrap(document, ['proverbs'])
    console.info('angular bootstrap')
}

angular.element(document).ready(bootstrap_angular)
