app.controller('OtherCtrl', function($scope, $state, $stateParams, $firebaseAuth, $firebaseArray, $ionicPopup) {
  $scope.show = 1; //send a friend request
  var dateObj = (new Date()).getFullYear();
  $firebaseAuth().$onAuthStateChanged(function(user) {

      //--------------- CHECK IF USER A AND USER B ARE ALREADY FRIEND -----------------
      var buddiesRef = firebase.database().ref("prod/users/" + user.uid + "/buddies");
      buddiesRef.on("value", function(snapshot){
        if (snapshot.val()){
          if (snapshot.val().hasOwnProperty($stateParams.otherId)){
            console.log("true");
            $scope.show = 3; //this person is your friend
          }
        }
      });

      //-------------------------- GET USER B INFORMATION -------------------------
      var otherRef = firebase.database().ref("prod/users/" + $stateParams.otherId);
      otherRef.on("value", function(snapshot){

        //---------- GET OTHER USER INFORMATION ------------------
        $scope.buddyid = $stateParams.otherId;
        $scope.name = snapshot.val().name;
        $scope.description = snapshot.val().description;
        $scope.birthyear = parseInt(snapshot.val().birthyear.substring(0,4));
        $scope.age = dateObj - $scope.birthyear;
        $scope.pictureUrl = snapshot.val().pictureUrl;
        $scope.interests = snapshot.val().interest.split(",").length - 1;
        $scope.friendrequests = snapshot.val().friendrequests;


        //--------- IF USER A HAS ALREADY SEND A FRIEND REQUEST TO USER B ------------
        //-------- THEN ON USER'S B PROFILE, IT SAYS FRIEND REQUEST SENT --------------
        if ($scope.friendrequests){
          if ($scope.friendrequests.hasOwnProperty(user.uid)){
            $scope.show = 2; //request sent
          }
        }


        //---------- IF USER B HAS ALREADY SEND A FRIEND REQUEST TO USER A ----------
        // --------- THEN USER A ONLY NEEDS TO ACCEPT THE FRIEND REQUEST --------------
        var userRef = firebase.database().ref("prod/users/" + user.uid + "/friendrequests");
        userRef.on("value", function(usersnap){
          if (usersnap.val()){
            if (usersnap.val().hasOwnProperty($stateParams.otherId)){
              $scope.show = 4; //accept this person request?
            }
          }
          // $scope.$apply();
        });
        // $scope.$apply();
      });


      //-----  IF USER A SEND USER B FRIEND REQUEST, THIS IS TO PUSHED TO USER B FIREBASE ------
      $scope.SendRequest = function(){
        var obj = {};
        otherRef.child("friendrequests/" + user.uid).update({
          "request": "pending"
        });
        $scope.show = 2; //request sent
        console.log("Successfully sent friend requests");
      };
    });
});
