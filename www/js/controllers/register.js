app.controller('RegisterCtrl',  function($scope, $state, $ionicPopup, $firebaseAuth) {
     $scope.errorMessage = "";
     var auth = $firebaseAuth();

   //--------------- FUNCTION TO GET LOCATION ------------------
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    //------------- GET USER CURRENT LOCATION ----------------------------
    function showPosition(position) {
        var geocoder= new google.maps.Geocoder();
        var latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
        geocoder.geocode({'location': latlng}, function(results, status) {

          //----------- IF SUCCESSFULLY CAPTURE THE LOCATION --------------
          if (status == 'OK'){
            $scope.location = results[5].formatted_address;
            console.log($scope.location);
          }
          else{
            $ionicPopup.alert({
              title: "Unable to get your current location"
            });
            $scope.location = "N/A";
          }
        });
    }
  getLocation();
  $scope.RegisterUser = function(user){
    $scope.user = user;
    auth.$createUserWithEmailAndPassword(user.email, user.password)
        .then(function(resolve){
          var info = {
          name: $scope.user.name,
          email: $scope.user.email,
          description: "This is a part where you can write a few short descriptive sentences about your bio",
          interest: "",
          birthyear: $scope.user.birthyear,
          location: $scope.location,
          pictureUrl: "https://firebasestorage.googleapis.com/v0/b/buddy-project-d9fe9.appspot.com/o/default-avatar.png?alt=media&token=dd0f36d1-5424-43a0-8d51-d2e22f2e5aa2"
        };
        var userRef = firebase.database().ref("prod/users/");
        var user = firebase.auth().currentUser;
        userRef.child(user.uid).set(info);
        $state.go('tab.profile');
    })

    //----------------------- CATCHING ERRORS --------------------------
    .catch(function(error)
      {
        $scope.errorMessage = error.message;
      });
  };
});
