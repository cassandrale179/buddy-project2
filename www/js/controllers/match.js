app.controller('MatchCtrl', function($scope, $state, $firebaseAuth, $firebaseArray, $firebaseObject) {
  $firebaseAuth().$onAuthStateChanged(function(owner) {

    if (owner){

      //------------- GET USER INTEREST FROM FIREBASE ---------------
      var userRef = firebase.database().ref("prod/users/" + owner.uid);
      userRef.on("value", function(snapshot){
        $scope.UserInterest = snapshot.val().interest.split(",");
        $scope.UserInterest.splice(-1);
      });


      //------------- GET OTHER PEOPLE INTEREST FROM FIREBASE ---------------
      console.log("Matches are loading");

      //--------- GET A LIST OF USER'S FRIEND ------------
      var buddiesRef = firebase.database().ref("prod/users/" + owner.uid + "/buddies");
      $scope.buddiesData = $firebaseArray(buddiesRef);
      $scope.buddiesData.$loaded().then(function(x){
        $scope.BuddiesID = [];
        angular.forEach($scope.buddiesData, function(friend){
            $scope.BuddiesID.push(friend.$id);
        });
         // console.log($scope.BuddiesID);
      });



      //------------ GET EVERYONE INFORMATION -----------
     var otherRef = firebase.database().ref("prod/users");
      $scope.otherData = $firebaseArray(otherRef);
      $scope.otherData.$loaded().then(function(x){
        $scope.MatchesArray = [];

        //------ OWNER IS THE USER, FRIEND ARE THE USER'S FRIENDS -----
        angular.forEach($scope.otherData, function(everyone){



          //GET EACH OTHER USER INTEREST 
          if (owner.uid != everyone.$id && $scope.BuddiesID.indexOf(everyone.$id) == -1){
            $scope.OtherInterest = everyone.interest.split(",");
            $scope.OtherInterest.splice(-1);


            //CREATE AN ARRAY THAT STORE COMMON INTERESTS BETWEEN OTHER AND USERS
            $scope.CommonInterest = [];
            for (var i in $scope.UserInterest){
              if ($scope.OtherInterest.indexOf($scope.UserInterest[i]) != -1){
                $scope.CommonInterest.push($scope.UserInterest[i]);
              }
            }

            //IF A PERSON AND THE USER SHARE COMMON INTEREST, STORE THEM IN MATCHESDATA
            if ($scope.CommonInterest.length > 0){
              $scope.CommonInterestStr = $scope.CommonInterest.join(",");
              var match = {
                uid: everyone.$id,
                name: everyone.name,
                pictureUrl: everyone.pictureUrl,
                common: $scope.CommonInterestStr
              };
              $scope.MatchesArray.push(match);
            }
          }
        });
        console.log($scope.MatchesArray);

        //------ IF THERE ARE NO MATCHES ----------
        if ($scope.MatchesArray.length === 0){
          $scope.NoMatch = true;
        }
        else{
          $scope.NoMatch = false;
        }
      });


      //------------- RANDOM MATCH ----------------
      $scope.RandomMatch = function(){
        do{
          var random = Math.floor(Math.random() * $scope.otherData.length);
          $scope.RandomPerson = $scope.otherData[random];
          $scope.Random = true;
          console.log($scope.RandomPerson);
        }
        while($scope.RandomPerson.$id == owner.uid);

      };
    }


    else{
      $state.go('login');
    }
  });
});
