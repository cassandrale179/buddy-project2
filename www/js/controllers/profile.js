app.controller('ProfileCtrl',  ['$scope', '$state',
function($scope) {
  var user = firebase.auth().currentUser;
  var dateObj = (new Date()).getFullYear();
  $scope.$on('$ionicView.enter', function() {
    //if (user !== null){
    //  var userRef = firebase.database().ref("users/" + user.uid);
    var userRef = firebase.database().ref("users/" + "aUxZ8uPNgbc4USL4gTr1CXBiHHN2");
      userRef.on("value", function(snapshot){
        $scope.name = snapshot.val().name;
        $scope.description = snapshot.val().description;
        $scope.birthyear = parseInt(snapshot.val().birthyear.substring(0,4));
        $scope.age = dateObj - $scope.birthyear;
        $scope.$apply();
      });
  //  }
    // else{
    //   console.log("Please login again");
    // }
  });

}]);
