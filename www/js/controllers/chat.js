app.controller('ChatsCtrl', function($scope, Message, $firebaseAuth) {
  $firebaseAuth().$onAuthStateChanged(function(user) {
    var refUser = firebase.database().ref("prod/users/" + user.uid + "/buddies");
    refUser.on("value", function(snapshot){
      var buddiesList = snapshot.val();
      $scope.chats = Object.values(buddiesList);
      console.log($scope.chats);
    });
  });

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Message) {

});
