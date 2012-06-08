angular.module('elastic', ['ngResource']).
    factory('Elastic', function($resource, $http) {
        var Elastic = function() {}

        Elastic.prototype.get = function(params, successCallback, errorCallback) {

            var r = $resource('http://' + params.host + '::port' + '/' + params.path,
                {port: params.port},
                {get:{method:'GET'}});

            r.get({}, successCallback, errorCallback);
        }

        Elastic.prototype.post = function(params, data, successCallback, errorCallback) {

            $http.post('http://' + params.host + ':' + params.port + '/' + params.path,
                data || {},
                {headers:{'Content-Type':'application/x-www-form-urlencoded'}}).
                success(successCallback).error(errorCallback);
        }

        Elastic.prototype.delete = function(params, successCallback, errorCallback) {

            $http.delete('http://' + params.host + ':' + params.port + '/' + params.path,
                {headers:{'Content-Type':'text/plain'}, data: {}}).
                success(successCallback).error(errorCallback);
        }

        return new Elastic();
    });