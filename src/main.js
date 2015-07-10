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
	.when('/', {
	    templateUrl: 'template.about',
	    controller: "QAboutCtrl"
	})
	.otherwise({
	    redirectTo: '/'
	})
}])

let QAboutCtrl = function($scope, $location) {
//    $scope.result = sm.quiz.result
}
app.controller('QAboutCtrl', QAboutCtrl)
QAboutCtrl.$inject = ['$scope', '$location']

let bootstrap_angular = function() {
    angular.bootstrap(document, ['proverbs'])
    console.info('angular bootstrap')
}

angular.element(document).ready(bootstrap_angular)
