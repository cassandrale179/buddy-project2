app.controller('RegisterCtrl',  ['$scope', '$state',
 function($scope, $state) {
  $scope.message = "";
  $scope.RegisterUser = function(user){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function(resolve){
          var user = firebase.auth().currentUser;
          console.log("User is created");
          $state.go('tab.profile');
    });
  };

}]);
