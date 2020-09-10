const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.webhook = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send({
        "fulfillmentText": "Hello, I am your new bot from firebase functions.",
        // "fulfillmentMessages": [{
        //       "text": {
        //             "text": [
        //                 "Hello, I am your new bot from firebase functions."
        //             ]
        //       },
        // }]
  });
});
