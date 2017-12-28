app.controller('InterestCtrl', function($scope, $state) {

  //IF USER CLICK ADD INTEREST, REDIRECT TO MATCH PAGE
  $scope.AddInterest = function(){
    $state.go('match');
  };

  $scope.DisplayData = [];
  $scope.UserInterest = [];
  $scope.NoInterest = false;

  //------------- CHECK THE CURRENT USER HOW MANY INTERESTS THEY HAVE ---------
  var userRef = firebase.database().ref("users/" + "aUxZ8uPNgbc4USL4gTr1CXBiHHN2");
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
  var interestRef = firebase.database().ref("interests");
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

      //IF AN INTEREST ALREADY EXIST
      if (typeof interest == "string"){
          $scope.UserInterest.push(interest);
          $scope.InterestString = $scope.InterestString + interest +  "," ;
          var fb = firebase.database().ref("interests");
          var obj = {};
          obj[interest] = 1;
          fb.update(obj);
      }


      //IF AN INTEREST HAS NOT EXIST
      else{
        $scope.UserInterest.push(interest.name);
        $scope.InterestString = $scope.InterestString + interest.name +  "," ;
      }

      //SEND INFO TO THE USER DATABASE
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
