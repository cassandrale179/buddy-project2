app.controller('ProfileCtrl',  ['$scope', '$state',
function($scope) {
  // $scope.name = "Elliot Anderson";
  $scope.$on('$ionicView.enter', function() {
    var userRef = firebase.database().ref("users/" + "S9TZy3VPmSTv8Y7dnicGIdkXRkE3");
    userRef.on("value", function(snapshot){
      $scope.name = snapshot.val().name; 
      $scope.$apply();
      //alert($scope.name);
    });
  });
//   var user = firebase.auth().currentUser;
//   //if (user !== null){
//   //  var userRef = firebase.database().ref("users/" + user.uid);
//     var userRef = firebase.database().ref("users/" + "S9TZy3VPmSTv8Y7dnicGIdkXRkE3");
//     userRef.on("value", function(snapshot){
//       userData = snapshot.val();
//       $scope.name = snapshot.val().name;
//       console.log($scope.name);
//       $scope.age = snapshot.val().age;
//     });
// //  }

}]);
