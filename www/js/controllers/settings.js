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


            $cordovaCamera.getPicture(options).then(function(imageData) {
               var imageObjectRef = firebase.storage().ref('profilePictures/' + user.uid + '/profilePicture.jpg');
              // var image = document.getElementById('myImage');
              // image.src = "data:image/jpeg;base64," + imageData;
              imageObjectRef.putString(imageData, 'base64', {contentType:'image/jpg'});
              console.log("Successfully captured image");
            }, function(err) {
              console.log(err);
            });
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
