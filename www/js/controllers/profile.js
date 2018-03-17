app.controller('ProfileCtrl',
function($scope, $state) {



  //--------- VARIABLES TO BE USED ---------
  var user = firebase.auth().currentUser;
  $scope.numberOfFriends = 0;
  var dateObj = (new Date()).getFullYear();

  //---------- FUNCTIONS TO GET USER INFORMATION ----------------
  firebase.auth().onAuthStateChanged(function(user) {

    if (user){



    //-------- GET USER INFORMATION ------
      var userRef = firebase.database().ref("prod/users/" + user.uid);
      userRef.on("value", function(snapshot){
        $scope.name = snapshot.val().name;
        $scope.description = snapshot.val().description;
        $scope.birthyear = parseInt(snapshot.val().birthyear.substring(0,4));
        $scope.age = dateObj - $scope.birthyear;
        $scope.pictureUrl = snapshot.val().pictureUrl;
        $scope.interests = snapshot.val().interest.split(",").length - 1;
        $scope.friendrequests = snapshot.val().friendrequests;
        $scope.buddies = snapshot.val().buddies;
        // $scope.location = snapshot.val().location;

        if ($scope.buddies){
          $scope.numberOfFriends = Object.keys($scope.buddies).length;
        }


        //---------- CHECK IF THERE ARE ANY PENDING REQUEST -------------
        if ($scope.friendrequests){
          if (Object.keys($scope.friendrequests).length > 0){
            $scope.errorMessage = "You have " + Object.keys($scope.friendrequests).length.toString() + " friend request";
          }
        }
        else{
          $scope.errorMessage = "";
        }


        //------- REFRESH FUNCTIONS -----
        $scope.refresh = function(){
            window.location.reload();
            $state.go('tab.buddies');
        };


        $scope.$apply();
       });
    }

    //--------- IF USER IS NOT LOGGED IN  ------
    else{
       $state.go('login');
    }

  });

});
