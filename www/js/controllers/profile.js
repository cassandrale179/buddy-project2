app.controller('ProfileCtrl',  ['$scope', '$state',
function($scope) {
  var user = firebase.auth().currentUser;
  var dateObj = (new Date()).getFullYear();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user){
      var userRef = firebase.database().ref("prod/users/" + user.uid);
      userRef.on("value", function(snapshot){
        $scope.name = snapshot.val().name;
        $scope.description = snapshot.val().description;
        $scope.birthyear = parseInt(snapshot.val().birthyear.substring(0,4));
        $scope.age = dateObj - $scope.birthyear;
        $scope.pictureUrl = snapshot.val().pictureUrl;
        $scope.interests = snapshot.val().interest.split(",").length - 1;
        $scope.$apply();
       });
    }
    else{
       console.log("Please login again");
    }

  });

}]);
