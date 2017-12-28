angular.module('starter.services', [])
//
// .factory('Chats', function() {
//   // Might use a resource here that returns a JSON array
//
//   // Some fake testing data
//   var chats = [{
//     id: 0,
//     name: 'Ben Sparrow',
//     lastText: 'You on your way?',
//     face: 'img/ben.png'
//   }, {
//     id: 1,
//     name: 'Max Lynx',
//     lastText: 'Hey, it\'s me',
//     face: 'img/max.png'
//   }, {
//     id: 2,
//     name: 'Adam Bradleyson',
//     lastText: 'I should buy a boat',
//     face: 'img/adam.jpg'
//   }, {
//     id: 3,
//     name: 'Perry Governor',
//     lastText: 'Look at my mukluks!',
//     face: 'img/perry.png'
//   }, {
//     id: 4,
//     name: 'Mike Harrington',
//     lastText: 'This is wicked good ice cream.',
//     face: 'img/mike.png'
//   }];
//
//   return {
//     all: function() {
//       return chats;
//     },
//     remove: function(chat) {
//       chats.splice(chats.indexOf(chat), 1);
//     },
//     get: function(chatId) {
//       for (var i = 0; i < chats.length; i++) {
//         if (chats[i].id === parseInt(chatId)) {
//           return chats[i];
//         }
//       }
//       return null;
//     }
//   };
// })
//----------------------------  FACTORY FOR THE MESSAGE PAGE -----------------------------------
app.factory('Message', ['$firebaseArray',
  function($firebaseArray) {
  var messageRef = firebase.database().ref('prod/messages');
  // var convo = $firebaseArray(convoRef);
  var convo;
  var matchRef;
  var convoRef;
  var convoId;
  var uid1;
  var uid2;


  var Message =
  {
    create: function (msg) {
      return convo.$add(msg);
    },
    delete: function (msg) {
      return convo.$remove(msg);
    },

    //
    getConvoId: function(database, userId1, userId2) {
      matchRef1 = firebase.database().ref('match/'+ userId1 + "/" + userId2);
      matchRef2 = firebase.database().ref('match/'+ userId2+ "/" + userId1);

      console.log("Current database convoID:" + database.convoId);

      //IF CONVO ID EXIST, OUTPUT IT. ELSE CREATE NEW ONE
      if (database.convoId){
        convoId = database.convoId;
        console.log("Already has a convo Id" + convoId);
      }
      else{
        var newRef = messageRef.push();
        convoId = newRef.key;
        console.log("These guys don't have a convoID, so now their convo ID is: " + convoId);
      }

      //CREATE A CONVO ID UNDER THE MESSAGE TABLE
      convoRef = messageRef.child(convoId);
      convo = $firebaseArray(convoRef);

      //ADD READ STATUS
      // convo.$loaded()
      //   .then(function() {
      //     angular.forEach(convo, function(msg){
      //       if (msg.sender=uid2){
      //         msg.read=true;
      //       }
      //       console.log(msg);
      //     })
      //   })
      var conversation = {
        convoId: convoId //convoID: XOsksjdsjdad
      };

      //PUT THESE CONVO ID UNDER BOTH USER MATCH TABLE
      matchRef1.update(conversation);
      matchRef2.update(conversation);
      console.log("Convo id:"+ convoId);
      return convo;
    },

    //RETURN THE CONVO ID
    returnConvoId: convoId,

    //SET THE USER ID FOR BOTH PARTICIPANTS
    setUid: function(userId1, userId2){
      uid1 = userId1;
      uid2 = userId2;
    },
    returnUid1: function() {
      return uid1;
    },
    returnUid2: function() {
      return uid2;
    },
    addReadStatus: function(matchRef) {
      // angular.forEach(convo, function(msg){
      //   if (msg.sender==uid2){
      //     msg.read=true;
      //     convo.$save(msg);
      //   }
      // })
      matchRef.update({
        readStatus: "read"
      });
    },
    countUnreadMessage: function(convo){
      angular.forEach(convo, function(msg){
        console.log(msg);
      });
    }
  };
  return Message;
}]);
