/**
 * Created by yacmed on 25/06/2015.
 */
'use strict'
app.factory('sessionService', function($http){
    var API_URI = 'api/';
    return {
        set:function(key, value){
            /**
             * Ajoute des variable de session cl�, valeur
             */
            return sessionStorage.setItem(key, value);
        },
        get:function(key){
            /**
             * Permet de recupperer la valeur d'une variable de session par sa cl�
             */
            return sessionStorage.getItem(key);
        },
        destroy:function(){
            /**
             * Ici je d�truis toutes les variables de  session cot� client
             */
            for (var key in sessionStorage){
                sessionStorage.removeItem(key, sessionStorage.getItem[key]);
            }
        }
    };
});

app.factory('loginService', function($http, $location, sessionService){
   return{
       login:function(data, $scope){
           var $promise = $http.post('API/',data); //  vous pouvez passer par le success et error de $http
           $promise.then(function(msg){
                var userId = msg.data;
               if (userId!="fail"){
                   sessionService.set('user', userId);
                   $location.path('/home');
               } else {
                   $scope.msgTxt = 'incorrect informations';
                   $location.path('/login');
               }
           });
       },
       logout: function(){
           sessionService.destroy(); //destruction de la session cot� client
           $http.post('API/DESTROY/');//destruction de la session cot� serveur
           $location.path('/login'); // redirection vers la page du login
       },
       isLogged: function(){
           /**
            * Pour plus de s�curit� j'envoie  la variable de session user � mon serveur qui devrait avoir la m�me
            * Si ce n'est pas le cas le serveur ne renvoie rien et la redirection est faite sur authentificationApp
            * (app.js line 18) via le logout qui d�truit la session client et de m�me du c�t� du serveur
            */
           var user = sessionService.get('user');
           var  $checkSessionServer = $http.get('API/CHECK_SESSION/?user='+user);
           return $checkSessionServer;
       }
   }
});
