angular.module('esClient', ['elastic']).
    config(function($routeProvider) {
        $routeProvider.
            when('/query', {controller:ListCtrl, template:'templates/query.html'}).
            otherwise({redirectTo:'/query'});
    });

function ListCtrl($scope, Elastic) {

    $scope.params = {
        'host': 'localhost',
        'port': '9200',
        'query': '{ "query" : { "match_all" : {}}}',
        'method': 'get',
        'path': '_search'
    };

    $scope.queryDisabled = function() {
        return $scope.params.method != 'post';
    }

    $scope.isEmptyResult = function() {
        return !$scope.result;
    }

    $scope.isEmptyError = function() {
        return !$scope.resultError;
    }

    $scope.succesCallback = function(data) {
        $scope.result = data;
    }

    $scope.errorCallback = function(data) {
        $scope.resultError = data;
    }

    $scope.send = function() {
        $scope.result = null;
        $scope.resultError = null;

        switch($scope.params.method) {
            case 'post':
                Elastic.post($scope.params, $scope.params.query, $scope.succesCallback, $scope.errorCallback);
            break;

            case 'delete':
                Elastic.delete($scope.params, $scope.succesCallback, $scope.errorCallback);
            break;

            default:
                Elastic.get($scope.params, $scope.succesCallback, $scope.errorCallback);
        }
    }


}

