app.controller('BuddiesCtrl', function($scope, $state, $firebaseAuth, $firebaseArray, $ionicPopup) {
  $firebaseAuth().$onAuthStateChanged(function(user){

    $scope.PendingArr = [];
    $scope.BuddiesArr = [];

    //--------- ACCESS USER FRIEND REQUESTS AND CURRENT FRIENDS  ----------
    var pendingRef = firebase.database().ref("prod/users/" + user.uid + "/friendrequests");
    var buddiesRef = firebase.database().ref("prod/users/" + user.uid + "/buddies");
    $scope.pendingPeople =  $firebaseArray(pendingRef);
    $scope.buddiesPeople = $firebaseArray(buddiesRef);



    //------------- LOAD IF USER HAS ANY FRIEND REQUESTS ---------------
      $scope.pendingPeople.$loaded().then(function(x)
    {
        if ($scope.pendingPeople.length > 0){
          angular.forEach($scope.pendingPeople, function(req){
            var reqRef = firebase.database().ref("prod/users/" + req.$id);
            reqRef.on("value", function(snapshot){
              $scope.req = {};
              $scope.req.id = req.$id;
              $scope.req.name = snapshot.val().name;
              $scope.req.pictureUrl = snapshot.val().pictureUrl;
              $scope.PendingArr.push($scope.req);
            });
          });
          $state.go("tab.buddies");
        }
        else{
          $scope.NoPending = true;
        }
    });




    //-------------- LOAD IF USER HAS ANY FRIENDS --------------
      $scope.buddiesPeople.$loaded().then(function(x){
        if ($scope.buddiesPeople.length > 0){
          angular.forEach($scope.buddiesPeople, function(buddy){
            $scope.BuddiesArr.push(buddy);
          });
        }
        else{
          console.log("You have no buddies at the moment");
          $scope.NoBuddies = true;
        }
      });



    //---------------- APPROVE OR DENY A REQUEST --------------
    $scope.showConfirm = function(buddiesName, buddiesId, buddiesPic) {
     var confirmPopup = $ionicPopup.confirm({
        title: "Accept " + buddiesName + " 's request?",
        template:  "Click OK to accept"
     });

     confirmPopup.then(function(res) {

       //----------- IF USER A APPROVE OF REQUEST -------------
        if(res) {
          console.log("Accepted friend request!");

          //------------ REMOVE PENDING FRIEND REQUEST -------------------
          pendingRef.child(buddiesId).remove().then(function(){
            console.log("Request pending removed");
          })
          .catch(function(){
            console.log("Unable to remove");
          });


          //-------------- CREATE A CONVERSATION BETWEEN THE USERS -----------
          var chatRef = firebase.database().ref("prod/chats");
          var convoID = chatRef.push();
          convoID = convoID.key;

          var messageObject = {
            sender: user.uid,
            receiver: buddiesId,
            timestamp: Date.now(),
            text: "You are now each other's buddies :) "
          };

          chatRef.child(convoID).push(messageObject);
          console.log(convoID);


          //----------- ADD USER B TO USER A (CURRENT USER)'S FRIEND LIST --------
          buddiesRef.child(buddiesId).update({
            id: buddiesId,
            name: buddiesName,
            pictureUrl: buddiesPic,
            convo: convoID
          });

          //----------- ADD USER B TO USER A (CURRENT USER)'S FRIEND LIST --------
            var otherBuddiesRef = firebase.database().ref("prod/users/" + buddiesId + "/buddies");
            var userRef = firebase.database().ref("prod/users/" + user.uid);
            userRef.on("value", function(userinfo){
              otherBuddiesRef.child(user.uid).update({
                id: user.uid,
                name: userinfo.val().name,
                pictureUrl: userinfo.val().pictureUrl,
                convo: convoID,
                lastText: "You are now each other's buddies :) "
              });
            });


        }
        //------------- IF USER CLICK CANCEL ------------
        else {
          console.log("User click cancel");
        }
     });
    };


  });
});
