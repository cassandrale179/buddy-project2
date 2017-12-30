app.controller('BuddiesCtrl', function($scope, $state, $firebaseAuth, $firebaseArray, $ionicPopup) {
  $firebaseAuth().$onAuthStateChanged(function(user){

    $scope.PendingArr = [];

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
    });




    //-------------- LOAD IF USER HAS ANY FRIENDS --------------
      $scope.buddiesPeople.$loaded().then(function(x){
        if ($scope.buddiesPeople.length > 0){
          angular.forEach($scope.buddiesPeople, function(buddy){

          });
        }
        else{
          console.log("You have no buddies at the moment");
        }
      });



    //---------------- APPROVE OR DENY A REQUEST --------------
    $scope.showConfirm = function(buddiesName, buddiesId, buddiesPic) {
     var confirmPopup = $ionicPopup.confirm({
        title: "Accept " + buddiesName + " 's request?",
        template:  "Click OK to accept or tap on " + buddiesName + "'s name to view their profile"
     });

     confirmPopup.then(function(res) {

       //----------- IF USER APPROVE OF REQUEST -------------
        if(res) {
          buddiesRef.child(buddiesId).update({
            id: buddiesId,
            name: buddiesName,
            pictureUrl: buddiesPic
          });
        }
        //------------- IF USER CLICK CANCEL ------------
        else {
           console.log('Cancel');
        }
     });
    };


  });
});
