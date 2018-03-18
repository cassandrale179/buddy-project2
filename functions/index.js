const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//-------------- SEND MESSAGE NOTIFICATIONS -----------
exports.sendMessageNotificaton = functions.database
    .ref('/prod/chats/{chatID}').onWrite(event => {
    let chatID = event.params;
    let original = event.data.val();
    let keys = Object.keys(original);
    let lastkey = keys[keys.length-1];
    let receiver = original[lastkey].receiver;
    let text = original[lastkey].text;
    console.log("receiver id", receiver);



    //---------- GET INFORMATION OF THE RECEIVER ------------
    const ReceiverPromise = admin.database().ref('prod/users/' + receiver).once('value');
    Promise.all([ReceiverPromise]).then(snapshot => {
        var data = snapshot[0].val();

        //------ GET RECEIVER'S MESSAGE TOKEN -----
        if (data.messageToken){
            var token = data.messageToken;
            let payload = {
                notification: {
                    title: "Your buddy messaged you!",
                    body: text,
                    sound: "default"
                }
            };

            //----------- SEND NOTIFICATIONS ------------
            admin.messaging().sendToDevice(token, payload)
                .then(response => {
                    console.log("Successfully sent notification", response);
                    return response;
                }).catch(error => {
                    console.log(error);
                });

        //--------- IF THEY DO NOT HAVE A MESSAGE TOKEN -------
        }
        else{
            console.log("User does not have a message token");
        }
        return data;
    }).catch(error => {
        console.log(error);
    });
});



//----------------- SEND NOTIFICATIONS WHEN SOMEONE SEND A FRIEND REQUEST --------
exports.sendFriendRequestNotification = functions.database
    .ref('/prod/users/{userID}/friendrequests').onWrite(event =>{
        let newrequest = event.data.val();
        let keys = Object.keys(newrequest);
        let lastkey = keys[keys.length-1];
        console.log("new request", newrequest);


        let receiverID = event.params.userID;
        console.log("receiver id", receiverID);

        let receiverPromise = admin.database().ref('prod/users/' + receiverID).once("value");
        Promise.all([receiverPromise]).then(snap => {
            var userInfo = snap[0].val();
            console.log("data", userInfo);
            if (userInfo.messageToken){
                var token = userInfo.messageToken;
                let payload = {
                    notification: {
                        title: "You have a friend request!",
                        body: "Check Buddy Project to find out more",
                        sound: "default"
                    }
                };


                //----------- SEND NOTIFICATIONS ------------
                admin.messaging().sendToDevice(token, payload)
                    .then(response => {
                        console.log("Successfully sent notification", response);
                        return response;
                    }).catch(error => {
                        console.log(error);
                    });
            }
            else{
                console.log("User does not have a message token");
            }
            return UserInfo;

        }).catch(error => {
            console.log(error);
        });

});
