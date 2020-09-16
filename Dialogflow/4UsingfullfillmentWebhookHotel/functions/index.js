const functions = require('firebase-functions');
var admin = require('firebase-admin');

var app = admin.initializeApp(functions.config().firebase);
var firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.bookhotel = functions.https.onRequest((request, response) => {
    
    let action = request.body.queryResult.action;
    let params = {};

    switch (action) {
        case "BookHotel":
            params = request.body.queryResult.parameters;
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
                    console.log('Error in writing bookings into DB', e);
                    response.send({
                        "fulfillmentText": "Something went wrong when writing on database."
                    });
                });
            break;
        
        case "CountAllBookings":
            firestore.collection("orders").get()
                .then((queryResult) => {
                    var orders = [];
                    queryResult.forEach((doc) => {orders.push(doc.data()) });

                    return response.send({
                        "fulfillmentText": `You have ${orders.length} orders, would you like to see them?`
                    })

                })
                .catch((err) => {
                    console.log('Error in getting count of bookings from DB', err);
                    response.send({
                        "fulfillmentText": "Something went wrong when reading count from database."
                    });
                })
            break;
        
        case "ShowAllBookings":
            firestore.collection("orders").get()
                .then((queryResult) => {
                    var orders = [];
                    queryResult.forEach((doc) => {orders.push(doc.data()) });

                    var orderDetail = `Here are your orders. \n`;

                    orders.forEach((eachOrder, index) => {
                        orderDetail += `${index + 1}. ${eachOrder.roomType} room for 
                                        ${eachOrder.persons} persons, ordered by ${eachOrder.customerName}
                                            and contact email is ${eachOrder.customerEmail}. \n`
                    })

                    return response.send({
                        "fulfillmentText": orderDetail
                    })

                })
                .catch((err) => {
                    console.log('Error in getting bookings from DB', err);
                    response.send({
                        "fulfillmentText": "Something went wrong when reading from database."
                    });
                })
            break;
    
        default:
            response.send({
                "fulfillmentText": "No action matched in webhook."
            });
    }
});
