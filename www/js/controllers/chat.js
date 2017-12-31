app.controller('ChatsCtrl', function($scope, $firebaseAuth) {
  $firebaseAuth().$onAuthStateChanged(function(user) {
    var refUser = firebase.database().ref("prod/users/" + user.uid + "/buddies");
    refUser.on("value", function(snapshot){
      var buddiesList = snapshot.val();

      //--------- IF THE USER HAS FRIENDS ---------
      if (buddiesList){
        $scope.chats = Object.values(buddiesList);
      }

    });
  });

})


//---------------------- CONTROLLER FOR CHAT DETAILS PAGE -------------------------
.controller('ChatDetailCtrl', function($scope, $stateParams, $firebaseArray) {

  //------------------ VARIABLES TO BE USED ----------------------
  $scope.conversation = [];
  $scope.chat = {};
  $scope.chat.name = $stateParams.chatName;
  $scope.chat.pictureUrl = $stateParams.chatPictureUrl;


  //------------------ GET THE CONVERSATION OF TWO USERS ------------------------
  var chatRef  = firebase.database().ref("prod/chats/" + $stateParams.chatId);
  $scope.chatData = $firebaseArray(chatRef);
  $scope.chatData.$loaded().then(function(x){
    angular.forEach($scope.chatData, function(message){
      $scope.conversation.push(message);
    });
    console.log($scope.conversation);
  });



  $scope.setColor = function(){
    var style1 = {

    };

    var style2 = {

    };


  };
});
