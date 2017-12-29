app.controller('InterestCtrl', function($scope, $state, $firebaseAuth, $firebaseArray, $firebaseObject) {
  var auth = $firebaseAuth();
  auth.$onAuthStateChanged(function(currentUser){
    console.log("User logged in!");

    //----------------------- GLOBAL VARIABLES TO BE USED ----------------------
    $scope.errorMessage = "";
    $scope.UserInterest = [];
    $scope.NoInterest = false;

    //------------- CHECK THE CURRENT USER HOW MANY INTERESTS THEY HAVE ---------
    var userRef = firebase.database().ref("prod/users/" + currentUser.uid);
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
    var interestObject = $firebaseObject(interestRef);
    $scope.interestData = $firebaseArray(interestRef);
    interestObject.$loaded().then(function(x){
      console.log(x);
    })
    // interestRef.on("value", function(snapshot){
    //   $scope.InterestData = snapshot.val();
    //   $scope.interest = {};
    //   for (var key in $scope.InterestData){
    //     $scope.interest.name = key;
    //     $scope.interest.likes = $scope.InterestData[key];
    //     $scope.DisplayData.push($scope.interest);
    //     $scope.interest = {};
    //   }
    //   console.log($scope.DisplayData);
    //   $scope.$apply();





      //---------------- FUNCTION TO ADD THE INTEREST  -----------------
      $scope.CaptureInterest = function(interest){
        //ONLY ADDING IF THE INTEREST IS NOT A DUPLICATE
        if (!interest){
          $scope.errorMessage = "Please input an interest";
          return;
        }
        console.log("interest", interest);


        //IF AN INTEREST HAS NOT EXIST, PUSH IT TO THE INTEREST DATABASE
        if (!interestObject.hasOwnProperty(interest.$id)){
          console.log("interest does not exist in database");
            interest.$id = interest.$id.toLowerCase();
            interest.$id = interest.$id.replace(/\s/g, '');
            console.log("interest", interest);


            if ($scope.UserInterest.indexOf(interest.$id) == -1){
              $scope.UserInterest.push(interest.$id);
            }
            else{
              $scope.errorMessage = "You already added this interest";
            }

              // $scope.InterestString = $scope.InterestString + interest +  "," ;
            var fb = firebase.database().ref("prod/interests");
            var obj = {};
            obj[interest.$id] = 1;
            fb.update(obj);
        }


        //IF AN INTEREST HAS EXIST, THEN UPDATE THE NUMBER OF LIKES OF THE INTEREST
        else{
          //ONLY ADDING IF THE INTEREST IS NOT A DUPLICATE
          if ($scope.UserInterest.indexOf(interest.$id) == -1){
            $scope.UserInterest.push(interest.$id);
            $scope.InterestString = $scope.InterestString + interest.$id +  "," ;
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

  }) //End of $onAuthStateChanged


});
