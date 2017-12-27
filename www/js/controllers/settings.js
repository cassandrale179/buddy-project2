app.controller('SettingsCtrl', function($scope, $state) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.LogOut = function(){
    var auth = firebase.auth();
    auth.signOut().then(function(){
      console.log("Logged out!");
      $state.go('register');
    });
  };
});
