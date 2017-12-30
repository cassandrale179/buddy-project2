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
          $scope.$apply();
        });
        $scope.$apply();
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



    //---------------- APPROVE OR DENY A REQUEST (REUSE FROM OTHER'S PAGE) --------------
    $scope.showConfirm = function(buddiesName, buddiesId, buddiesPic) {
     var confirmPopup = $ionicPopup.confirm({
        title: "Accept " + buddiesName + " 's request?",
        template:  "Click OK to accept or tap on " + buddiesName + "'s name to view their profile"
     });

     confirmPopup.then(function(res) {

       //----------- IF USER APPROVE OF REQUEST -------------
        if(res) {

          //----------- ADD USER B TO USER A (CURRENT USER)'S FRIEND LIST --------
          buddiesRef.child(buddiesId).update({
            id: buddiesId,
            name: buddiesName,
            pictureUrl: buddiesPic
          });

          //----------- ADD USER B TO USER A (CURRENT USER)'S FRIEND LIST --------
            var otherBuddiesRef = firebase.database().ref("prod/users/" + buddiesId + "/buddies");
            var userRef = firebase.database().ref("prod/users/" + user.uid);
            userRef.on("value", function(userinfo){
              otherBuddiesRef.child(user.uid).update({
                id: user.uid,
                name: userinfo.val().name,
                pictureUrl: userinfo.val().pictureUrl
              });
            });


            //------------ REMOVE PENDING FRIEND REQUEST -------------------
          pendingRef.child(buddiesId).remove().then(function(){
            console.log("Request pending removed");
          })
          .catch(function(){
            console.log("Unable to remove");
          });
        }
        //------------- IF USER CLICK CANCEL ------------
        else {
          console.log("User click cancel");
        }
     });
    };
});
