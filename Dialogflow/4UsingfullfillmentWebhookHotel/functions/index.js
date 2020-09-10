const functions = require('firebase-functions');
var admin = require('firebase-admin');

var app = admin.initializeApp(functions.config().firebase);
var firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.bookhotel = functions.https.onRequest((request, response) => {
    
    let params = request.body.queryResult.parameters
    console.log("request.body.result.parameters: ", params)

    firestore.collection("orders").add(params)
        .then(() => {
            return response.send({
                "fulfillmentText": `${params.customerName} your hotel booking request for ${params.roomType}
                                     room is forwarded for ${params.persons} persons, we will contact you on 
                                     ${params.customerEmail} soon.`,
            });
        })
        .catch((e) =>{
            response.send({
                "fulfillmentText": "Something went wrong when writing on database."
            });
        });
});
