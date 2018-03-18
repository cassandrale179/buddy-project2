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
      var date = new Date();
      date = moment(date);
      console.log(date);

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
        message.formatTime = moment(message.timestamp).calendar();
        $scope.conversation.push(message);
      });
    });

    //------------- WHEN USER INSERT A MESSAGE ---------------
    $scope.insert = function(newmessage){
      var d = new Date();
      newmessage.sender = user.uid;
      newmessage.receiver = $scope.buddiesId;
      newmessage.timestamp = d.toString();
      chatRef.push(newmessage);


      //------------- UPDATE THE LASTEST MESSAGE FOR BOTH USERS ------------
      var userRef = firebase.database().ref("prod/users/" + user.uid + "/buddies/" + $scope.buddiesId);
      var buddiesRef = firebase.database().ref("prod/users/" + $scope.buddiesId + "/buddies/" + user.uid);
      userRef.update({lastText: newmessage.text});
      buddiesRef.update({lastText: newmessage.text});
      $scope.conversation.push(newmessage);
      console.log($scope.conversation);
      console.log("message is inserted");
      $scope.newmessage = {};
    };

    //---------------------- CHANGE COLOR OF THE TEXT ------------------
    $scope.setColor = function(newmessage){
      var style = {
        "color": "white",
        "background": "#2E86C1",
        "font-size": "12px",
        "padding": "10px",
      };

      var style2 = {
         "color": "black",
         "background": "white",
         "font-size": "12px",
         "padding": "10px",
     };

      //--------- RETURN style ---------
      if (newmessage.sender == user.uid){
        return style;
      }
     else{
          return style2;
      }
    };

    //---------------------- CHANGE SHAPE OF CARD ------------------
    $scope.setCard = function(newmessage){
      var cardStyle = {
        "margin-top": "0px",
        "float": "right",
        "margin-bottom": "10px"
      };
      if (newmessage.sender == user.uid){
        return cardStyle;
      }
      else{
          return {"margin-bottom": "10px"};
      }
    };


    // --------------- GO BACK TO THE MAIN CHATS PAGE ---------------
    $scope.goBack = function(){
        console.log("this shit is clicked");
    };

  });
});
