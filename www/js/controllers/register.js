app.controller('RegisterCtrl',  ['$scope', '$state',
 function($scope, $state) {
  $scope.errormessage = "";
  $scope.RegisterUser = function(user){
    $scope.user = user;
    console.log(user.email);
    console.log(user.password);
    console.log(user.name);
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function(resolve){
          var info = {
          name: $scope.user.name,
          email: $scope.user.email,
          description: "Tap here to edit your bio",
          interest: "",
          buddy: "",
          pictureUrl: "https://firebasestorage.googleapis.com/v0/b/buddy-be3d7.appspot.com/o/default.png?alt=media&token=540dfe34-5559-4d2f-8e42-27258502ea01"
        };
        var userRef = firebase.database().ref("users/");
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
