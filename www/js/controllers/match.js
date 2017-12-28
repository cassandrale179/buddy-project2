app.controller('MatchCtrl', function($scope) {
  // $scope.DisplayData = [];
  //
  // //------- CALL THE INTEREST DATA FROM INTEREST REF --------
  // var interestRef = firebase.database().ref("interests");
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
  //
  //   //------- FUNCTION TO ADD THE INTEREST  --------
  //   $scope.CaptureInterest = function(interest){
  //     console.log("Interest to be pushed");
  //     console.log(interest);
  //
  //   };
  // });
});
