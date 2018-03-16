const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.sendMessageNotificaton = functions.database
    .ref('/prod/chats/{chatID}').onWrite(event => {
    let chatID = event.params;

});
