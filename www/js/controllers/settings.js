app.controller('SettingsCtrl', function($scope, $state, $cordovaCamera, $ionicPopup) {
  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);

      //----------------- IF USER IS LOGGED IN ---------------
      if (user){
        var UserRef = firebase.database().ref("prod/users/" + user.uid);
        UserRef.on("value", function(snapshot){
          $scope.description = snapshot.val().description;

        });


        //----------- FUNCTION TO UPLOAD PICTURE ------------
        $scope.UploadPicture = function(){
          document.addEventListener("deviceready", function () {
            var options = {
              quality: 100,
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


              //-------- UPDATE USER PROFILE PICTURE -------------
              imageObjectRef.getDownloadURL().then(function(url){
                UserRef.update({pictureUrl: url});
              });

            //-------- IF THERE ARE ERROR, DISPLAYED IT HERE -------------
            }, function(err) {
              console.log(err);
            });
          });
        };


        //---------------------- FUNCTION TO EDIT BIO ----------------------
        $scope.EditBio = function(){
          var popup = $ionicPopup.prompt({
             title: "Edit your bio",
             inputText: "",
             inputPlaceholder: $scope.description
          });

          popup.then(function(result){
            if (result){
              $ionicPopup.alert({
                title: "Your bio is updated!",
                template: result
              });

              UserRef.update({description: result});
            }
            else{
              console.log("Bio not update");
            }
          });
        };


        $scope.EditPassword = function(){
           firebase.auth().sendPasswordResetEmail(user.email).then(function() {
            $ionicPopup.alert({
              title: "Email to reset password sent!"
            });
          }).catch(function(error) {
            console.log(error);
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


        //------------ TESTING CODE FOR NOTIFICATIONS ----------

        $scope.SendNotifications = function(){
          console.log("This button is clicked"); 
          $scope.$on('$ionicView.beforeEnter', function(){
             window.FirebasePlugin.grantPermission();
             window.FirebasePlugin.getToken(function(token){
               console.log(token);
             }, function(error){
               console.error(error);
             })
          })
        }

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
