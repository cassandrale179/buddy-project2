app.controller('InterestCtrl', function($scope, $state) {

  //----------------------- GLOBAL VARIABLES TO BE USED ----------------------
  $scope.errorMessage = "";
  $scope.DisplayData = [];
  $scope.UserInterest = [];
  $scope.NoInterest = false;

  //------------- CHECK THE CURRENT USER HOW MANY INTERESTS THEY HAVE ---------
  var userRef = firebase.database().ref("prod/users/" + "HU3IqF8KodfYPY9yKMPuEHYC2A53");
  userRef.on("value", function(snapshot){
    $scope.UserData = snapshot.val();
    $scope.InterestString = $scope.UserData.interest;
    if ($scope.InterestString === ""){
      console.log("User currently have no interest");
      $scope.NoInterest = true;

    }
    else{
      $scope.UserInterest = $scope.InterestString.split(",");
      $scope.UserInterest.splice(-1);
      $state.go('interest');
    }
  });



  //------------- CALL THE INTEREST DATA FROM INTEREST REF --------------------
  var interestRef = firebase.database().ref("prod/interests");
  interestRef.on("value", function(snapshot){
    $scope.InterestData = snapshot.val();
    $scope.interest = {};
    for (var key in $scope.InterestData){
      $scope.interest.name = key;
      $scope.interest.likes = $scope.InterestData[key];
      $scope.DisplayData.push($scope.interest);
      $scope.interest = {};
    }
    console.log($scope.DisplayData);
    $scope.$apply();


    //---------------- FUNCTION TO ADD THE INTEREST  -----------------
    $scope.CaptureInterest = function(interest){

      //IF AN INTEREST HAS NOT EXIST, PUSH IT TO THE INTEREST DATABASE
      if (typeof interest == "string"){
          interest = interest.toLowerCase();
          interest = interest.replace(/\s/g, '');

          //ONLY ADDING IF THE INTEREST IS NOT A DUPLICATE
          if (!$scope.interest){
            $scope.errorMessage = "Please input an interest";
            return;}
          if ($scope.UserInterest.indexOf(interest) == -1){
            $scope.UserInterest.push(interest);
            $scope.InterestString = $scope.InterestString + interest +  "," ;
            var fb = firebase.database().ref("prod/interests");
            var obj = {};
            obj[interest] = 1;
            fb.update(obj);
            interest = null;
          }
          else{
            $scope.errorMessage = "You already added this interest";
          }

      }


      //IF AN INTEREST HAS EXIST, THEN UPDATE THE NUMBER OF LIKES OF THE INTEREST
      else{
        //ONLY ADDING IF THE INTEREST IS NOT A DUPLICATE
        if ($scope.UserInterest.indexOf(interest.name) == -1){
          $scope.UserInterest.push(interest.name);
          $scope.InterestString = $scope.InterestString + interest.name +  "," ;
        }
        else{
          $scope.errorMessage = "You already added this interest";
        }
      }

      //-----SEND INFO TO THE USER DATABASE--------
      userRef.update({
        "interest": $scope.InterestString
      });
      $state.go('interest');
    };


    //-------------- FUNCTION TO REMOVE AN INTEREST -----------------
    $scope.remove = function(index){
      $scope.updateString = "";
      $scope.UserInterest.splice(index, 1);
      for (var i in $scope.UserInterest){
        $scope.updateString += $scope.UserInterest[i] + ",";
      }
      console.log($scope.updateString);
      userRef.update({interest: $scope.updateString});
      $state.go('interest');
    };
  });
});
