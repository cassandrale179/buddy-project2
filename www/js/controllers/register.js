app.controller('RegisterCtrl',  ['$scope', '$state',
 function($scope, $state) {
  $scope.errormessage = "";
  $scope.RegisterUser = function(user){
    $scope.user = user;
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function(resolve){
          var info = {
          name: $scope.user.name,
          email: $scope.user.email,
          description: "This is a part where you can write a few short descriptive sentences about your bio",
          interest: "",
          buddies: "",
          birthyear: $scope.user.birthyear,
          location: "Philadelphia, PA",
          pictureUrl: "https://firebasestorage.googleapis.com/v0/b/buddy-project-d9fe9.appspot.com/o/default-avatar.png?alt=media&token=dd0f36d1-5424-43a0-8d51-d2e22f2e5aa2"
        };
        var userRef = firebase.database().ref("prod/users/");
        var user = firebase.auth().currentUser;
        userRef.child(user.uid).set(info);
        $state.go('tab.profile');
    })

    //----------------------- CATCHING ERRORS --------------------------
    .catch(function(error)
      {
        if (error.code == 'auth/weak-password') {
          $scope.errorMessage = "Password is weak.";
        }
        if (error.code == "auth/email-already-in-use"){
          $scope.errorMessage = "Email is already used by another account";
        }
        if (error.code == 'auth/invalid-email'){
          $scope.errorMessage = "Invalid email";
        }
        console.log(error);
        $state.go('register');
      });


  };

}]);
