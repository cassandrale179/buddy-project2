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
.controller('ChatDetailCtrl', function($scope, $stateParams, $firebaseArray, $firebaseAuth) {
    $firebaseAuth().$onAuthStateChanged(function(user){

    //------------------ VARIABLES TO BE USED ----------------------
    $scope.conversation = [];
    $scope.chat = {};
    $scope.chat.name = $stateParams.chatName;
    $scope.chat.pictureUrl = $stateParams.chatPictureUrl;
    $scope.buddiesId = $stateParams.chatBuddy;
    console.log($scope.buddiesId);


    //------------------ GET THE CONVERSATION OF TWO USERS ------------------------
    var chatRef  = firebase.database().ref("prod/chats/" + $stateParams.chatId);
    $scope.chatData = $firebaseArray(chatRef);
    $scope.chatData.$loaded().then(function(x){
      angular.forEach($scope.chatData, function(message){
        $scope.conversation.push(message);
      });
    });

    //------------- WHEN USER INSERT A MESSAGE ---------------
    $scope.insert = function(newmessage){
      newmessage.sender = user.uid;
      newmessage.receiver = $scope.buddiesId;
      newmessage.timestamp = Date.now();
      chatRef.push(newmessage);


      //------------- UPDATE THE LASTEST MESSAGE FOR BOTH USERS ------------
      var userRef = firebase.database().ref("prod/users/" + user.uid + "/buddies/" + $scope.buddiesId);
      var buddiesRef = firebase.database().ref("prod/users/" + $scope.buddiesId + "/buddies/" + user.uid);
      userRef.update({lastText: newmessage.text});
      buddiesRef.update({lastText: newmessage.text});
    };

    //------------- CHANGE COLOR OF THE TEXT ------------
    $scope.setColor = function(newmessage){
      var style = {
        "color": "white",
        "background": "#2E86C1"
      };
      if (newmessage.sender == user.uid){
        return style;
      }
    };


    $scope.setCard = function(newmessage){
      var cardStyle = {
        "float": "right"
      };
      if (newmessage.sender == user.uid){
        return cardStyle;
      }
    };


  });
});
