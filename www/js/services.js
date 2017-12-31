angular.module('starter.services', []);
//----------------------------  FACTORY FOR THE MESSAGE PAGE -----------------------------------
app.factory('Message', ['$firebaseArray',
  function($firebaseArray) {
    var message = {};
    return message; 

}]);
