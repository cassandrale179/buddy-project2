app.controller('SettingsCtrl', function($scope, $state, $cordovaCamera) {
  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function(user) {

      //----------------- IF USER IS LOGGED IN ---------------
      if (user){

        //----------- FUNCTION TO UPLOAD PICTURE ------------
        $scope.UploadPicture = function(){
          document.addEventListener("deviceready", function () {
            var options = {
              quality: 50,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: true,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 100,
              targetHeight: 100,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
        	     correctOrientation:true
            };
          });
        };


        //--------- FUNCTION TO LOG OUT USER -------------
        $scope.LogOut = function(){
          var auth = firebase.auth();
          auth.signOut().then(function(){
            console.log("Logged out!");
            $state.go('login');
          });
        };
      }


      //---------- IF USER IS NOT LOGGED IN, REDIRECT TO LOGIN PAGE ----------
      else{
        $state.go('login');
      }
  });




});
// $scope.settings = {
//   enableFriends: true
// };
