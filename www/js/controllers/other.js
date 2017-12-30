app.controller('OtherCtrl', function($scope, $state, $stateParams, $firebaseAuth, $firebaseArray) {
  $scope.sent = false;
  var dateObj = (new Date()).getFullYear();
  $firebaseAuth().$onAuthStateChanged(function(user) {

      var buddiesRef = firebase.database().ref("prod/users/" + user.uid + "/buddies");
      buddiesRef.on("value", function(snapshot){
        if (snapshot.val().hasOwnProperty($stateParams.otherId)){
          console.log("true");
          $scope.friended = true;
        }
        else{
          $scope.friended = false;
        }
      });


      var otherRef = firebase.database().ref("prod/users/" + $stateParams.otherId);
      otherRef.on("value", function(snapshot){

        //---------- GET OTHER USER INFORMATION ------------------
        $scope.name = snapshot.val().name;
        $scope.description = snapshot.val().description;
        $scope.birthyear = parseInt(snapshot.val().birthyear.substring(0,4));
        $scope.age = dateObj - $scope.birthyear;
        $scope.pictureUrl = snapshot.val().pictureUrl;
        $scope.interests = snapshot.val().interest.split(",").length - 1;
        $scope.friendrequests = snapshot.val().friendrequests;


        //--------- CHECK THE OTHER USER STATUS ------------
        if ($scope.friendrequests){
          if ($scope.friendrequests.hasOwnProperty(user.uid)){
            $scope.sent = true;
          }
        }
        $scope.$apply();
      });

      $scope.SendRequest = function(){
        var obj = {};
        otherRef.child("friendrequests/" + user.uid).update({
          "request": "pending"
        });
        $scope.sent = true;
        console.log("Successfully sent friend requests");
      };
    });
});
