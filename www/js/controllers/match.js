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
      var otherRef = firebase.database().ref("prod/users");
      var buddiesRef = firebase.database().ref("prod/users/" + owner.uid + "/buddies");
      $scope.buddiesData = $firebaseArray(buddiesRef);
      $scope.otherData = $firebaseArray(otherRef);
      $scope.otherData.$loaded().then(function(x){
        $scope.MatchesArray = [];
        angular.forEach($scope.otherData, function(user){

          //FILTER OUT OLD FRIENDS



          //GET EACH OTHER USER INTERES
          if (owner.uid != user.$id){
            $scope.OtherInterest = user.interest.split(",");
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
                uid: user.$id,
                name: user.name,
                pictureUrl: user.pictureUrl,
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
