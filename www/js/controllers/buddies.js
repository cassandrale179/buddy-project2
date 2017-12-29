app.controller('BuddiesCtrl', function($scope) {
  var refUser = firebase.database().ref("prod/users");
  var refCurrentUserId = firebase.database().ref("prod/users/" + currentUser.uid); 

});
