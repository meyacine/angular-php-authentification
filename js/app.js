/**
 * Created by yacmed on 25/06/2015.
 */
'use strict'
var app = angular.module('authentificationApp', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when('/login', {templateUrl : 'partials/login.html', controller : 'loginCtrl'});
    $routeProvider.when('/home', {templateUrl : 'partials/home.html', controller : 'homeCtrl'});
    $routeProvider.otherwise({redirectTo: '/login'});
});

app.run(function($rootScope, $location, loginService){
    var routesPermissions = ['/home'];
    $rootScope.$on('$routeChangeStart', function(){
         if (routesPermissions.indexOf($location.path())!=-1){
             var connected = loginService.isLogged();
             connected.then(function(msg){
                if (!msg.data) {
                    loginService.logout(); // this redirect and delete data entered manually
                }
             });
        }
    });
});
