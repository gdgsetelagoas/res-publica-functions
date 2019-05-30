/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

var firestore = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.updateAddReactions = functions.firestore.document('reacts/{reactId}')
    .onCreate((snap, context) => {
        let react = snap.data();
        console.log(react);
        firestore.runTransaction(trans => {
            let userRef = firestore.collection('users').doc(react.user_id);
            trans.get(userRef).then((userSnap) => {
                let newReactCount = (userSnap.data().num_reactions || 0) + 1;
                trans.set(userRef, { 'num_reactions': newReactCount });
            }).catch((cat) => { });
        }).catch((cat) => { });
        if (react.publication_id) {
            firestore.runTransaction((trans) => {
                let userRef = firestore.collection('publications').doc(react.publication_id);
                trans.get(userRef).then((userSnap) => {
                    let newReactCount = (userSnap.data().num_reacts || 0) + 1;
                    trans.set(userRef, { 'num_reacts': newReactCount });
                }).catch((cat) => { });
            });
        }
        if (react.reply_id) {
            firestore.runTransaction((trans) => {
                let userRef = firestore.collection('replies').doc(react.reply_id);
                trans.get(userRef).then((userSnap) => {
                    let newReactCount = (userSnap.data().num_reacts || 0) + 1;
                    trans.set(userRef, { 'num_reacts': newReactCount });
                }).catch((cat) => { });
            }).catch((cat) => { });
        }
    });
exports.updateRemoveReactions = functions.firestore.document('reacts/{reactId}')
    .onDelete((snap, context) => {
        let react = snap.data();
        console.log(react);
        firestore.runTransaction((trans) => {
            let userRef = firestore.collection('users').doc(react.user_id);
            trans.get(userRef).then((userSnap) => {
                let newReactCount = (userSnap.data().num_reactions || 0) - 1;
                trans.set(userRef, { 'num_reactions': newReactCount });
            }).catch((cat) => { });
        }).catch((cat) => { });
        if (react.publication_id) {
            firestore.runTransaction((trans) => {
                let userRef = firestore.collection('publications').doc(react.publication_id);
                trans.get(userRef).then((userSnap) => {
                    let newReactCount = (userSnap.data().num_reacts || 0) - 1;
                    trans.set(userRef, { 'num_reacts': newReactCount });
                }).catch((cat) => { });
            }).catch((cat) => { });
        }
        if (react.reply_id) {
            firestore.runTransaction((trans) => {
                let userRef = firestore.collection('replies').doc(react.reply_id);
                trans.get(userRef).then((userSnap) => {
                    let newReactCount = (userSnap.data().num_reacts || 0) - 1;
                    trans.set(userRef, { 'num_reacts': newReactCount });
                }).catch((cat) => { });
            }).catch((cat) => { });
        }
    });

exports.updateAddPubs = functions.firestore.document('publications/{publicationId}')
    .onCreate((snap, context) => {
        let pub = snap.data();
        console.log(pub);
        firestore.runTransaction((trans) => {
            let userRef = firestore.collection('users').doc(pub.user_id);
            trans.get(userRef).then((userSnap) => {
                let newCount = (userSnap.data().num_publications || 0) + 1;
                trans.set(userRef, { 'num_publications': newCount });
            }).catch((cat) => { });
        }).catch((cat) => { });
        if (pub.publication_id) {
            firestore.runTransaction((trans) => {
                let userRef = firestore.collection('publications').doc(pub.publication_id);
                trans.get(userRef).then((userSnap) => {
                    let newReactCount = (userSnap.data().num_reacts || 0) - 1;
                    trans.set(userRef, { 'num_replies': newReactCount });
                }).catch((cat) => { });
            }).catch((cat) => { });
        }
        if (pub.reply_id) {
            firestore.runTransaction((trans) => {
                let userRef = firestore.collection('replies').doc(pub.reply_id);
                trans.get(userRef).then((userSnap) => {
                    let newReactCount = (userSnap.data().num_reacts || 0) - 1;
                    trans.set(userRef, { 'num_replies': newReactCount });
                }).catch((cat) => { });
            }).catch((cat) => { });
        }
    });
exports.updateRemovePubs = functions.firestore.document('publications/{publicationId}')
    .onDelete((snap, context) => {
        let pub = snap.data();
        console.log(pub);
        firestore.runTransaction((trans) => {
            let userRef = firestore.collection('users').doc(pub.user_id);
            trans.get(userRef).then((userSnap) => {
                let newCount = (userSnap.data().num_publications || 0) - 1;
                trans.set(userRef, { 'num_publications': newCount });
            }).catch((cat) => { });
        }).catch((cat) => { });
        if (pub.publication_id) {
            firestore.runTransaction((trans) => {
                let userRef = firestore.collection('publications').doc(pub.publication_id);
                trans.get(userRef).then((userSnap) => {
                    let newReactCount = (userSnap.data().num_reacts || 0) - 1;
                    trans.set(userRef, { 'num_replies': newReactCount });
                }).catch((cat) => { });
            }).catch((cat) => { });
        }
        if (pub.reply_id) {
            firestore.runTransaction((trans) => {
                let userRef = firestore.collection('replies').doc(pub.reply_id);
                trans.get(userRef).then((userSnap) => {
                    let newReactCount = (userSnap.data().num_reacts || 0) - 1;
                    trans.set(userRef, { 'num_replies': newReactCount });
                }).catch((cat) => { });
            }).catch((cat) => { });
        }
    });

exports.updateAddReplies = functions.firestore.document('replies/{replyId}')
    .onCreate((snap, context) => {
        let reply = snap.data();
        console.log(reply);
        firestore.runTransaction((trans) => {
            let userRef = firestore.collection('users').doc(reply.user_id);
            trans.get(userRef).then((userSnap) => {
                let newCount = (userSnap.data().num_publications || 0) + 1;
                trans.set(userRef, { 'num_replies': newCount });
            }).catch((cat) => { });
        }).catch((cat) => { });
    });
exports.updateRemoveReplies = functions.firestore.document('replies/{replyId}')
    .onDelete((snap, context) => {
        let reply = snap.data();
        console.log(reply);
        firestore.runTransaction((trans) => {
            let userRef = firestore.collection('users').doc(reply.user_id);
            trans.get(userRef).then((userSnap) => {
                let newCount = (userSnap.data().num_publications || 0) - 1;
                trans.set(userRef, { 'num_publications': newCount });
            }).catch((cat) => { });
        }).catch((cat) => { });
    });