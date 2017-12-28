app.controller('LoginCtrl', ['$scope', '$state', '$firebaseAuth',
  function($scope, $state, $firebaseAuth){
    var auth = $firebaseAuth();
    $scope.LoginUser = function(user) {
      $scope.user = user;
      auth.$signInWithEmailAndPassword(user.email, user.password)
        .then(function(res){
          console.log("User logged in successfully!");
          $state.go('tab.profile');
        })
    }
}])
