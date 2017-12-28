app.controller('ChatsCtrl', function($scope, Message) {
  


})

.controller('ChatDetailCtrl', function($scope, $stateParams, Message) {

  console.log(moment().format());



  //----- WHEN USER CLICK INSERT, THEIR UID AND TIME OF MESSAGE ARE TAKEN -----
  $scope.insert = function(message)
  {

    //GET THE TIMESTAMP OF THE TEXT
    var dateTime = Date.now();
    var timestamp = Math.floor(dateTime/1000);
    var date = new Date(timestamp*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ":" + minutes.substr(-2);
    $scope.newmessage.formattedTime = formattedTime;
    $scope.newmessage.timestamp = timestamp;

    //GET THE CURRENT DATE OF THE TEXT
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    message.date = mm+'/'+dd;

    //GET THE SENDER AND RECEIVER UID
    $scope.newmessage.sender = uid1;
    $scope.newmessage.receiver = uid2;

    //CREATE READ STATUS
    message.read = false;

    //CREATE THE OBJECT MESSAGE
    Message.create(message);

    //Update last text under match Databas for both users
    userMatchRef1.update(
      {
        lastText: message.text,
        lastFormattedTime: message.formattedTime,
        lastDate: message.date,
        lastTimestamp: message.timestamp
      }
    );
    userMatchRef2.update(
      {
      lastText: message.text,
      lastFormattedTime: message.formattedTime,
      lastDate: message.date,
      lastTimestamp: message.timestamp,
      readStatus: "unread"
    });

    $scope.newmessage.text = "";


  };

});
