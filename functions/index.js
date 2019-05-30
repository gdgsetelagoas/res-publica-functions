const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

var firestore = admin.firestore();

exports.updateAddReactions = functions.firestore.document('reacts/{reactId}')
    .onCreate((snap, context) => {
        let react = snap.data();
        firestore.runTransaction(async (trans) => {
            let userRef = firestore.collection('users').doc(react.user_id);
            let userSnap = await trans.get(userRef);
            let newCount = (userSnap.data().num_reactions || 0) + 1;
            return trans.update(userRef, { 'num_reactions': newCount });
        });
        if (react.publication_id) {
            firestore.runTransaction(async (trans) => {
                let userRef = firestore.collection('publications').doc(react.publication_id);
                let userSnap = await trans.get(userRef);
                let newCount = (userSnap.data().num_reacts || 0) + 1;
                return trans.update(userRef, { 'num_reacts': newCount });
            });
        }
        if (react.reply_id) {
            firestore.runTransaction(async (trans) => {
                let userRef = firestore.collection('replies').doc(react.reply_id);
                const userSnap = await trans.get(userRef);
                let newCount = (userSnap.data().num_reacts || 0) + 1;
                return trans.update(userRef, { 'num_reacts': newCount });
            });
        }
    });
exports.updateRemoveReactions = functions.firestore.document('reacts/{reactId}')
    .onDelete((snap, context) => {
        let react = snap.data();
        firestore.runTransaction(async (trans) => {
            let userRef = firestore.collection('users').doc(react.user_id);
            let userSnap = await trans.get(userRef);
            let newCount = (userSnap.data().num_reactions || 0) - 1;
            return trans.update(userRef, { 'num_reactions': newCount });
        });
        if (react.publication_id) {
            firestore.runTransaction(async (trans) => {
                let userRef = firestore.collection('publications').doc(react.publication_id);
                let userSnap = await trans.get(userRef);
                let newCount = (userSnap.data().num_reacts || 0) - 1;
                return trans.update(userRef, { 'num_reacts': newCount });
            });
        }
        if (react.reply_id) {
            firestore.runTransaction(async (trans) => {
                let userRef = firestore.collection('replies').doc(react.reply_id);
                const userSnap = await trans.get(userRef);
                let newCount = (userSnap.data().num_reacts || 0) - 1;
                return trans.update(userRef, { 'num_reacts': newCount });
            });
        }
    });

exports.updateAddPubs = functions.firestore.document('publications/{publicationId}')
    .onCreate((snap, context) => {
        let pub = snap.data();
        firestore.runTransaction(async (trans) => {
            let userRef = firestore.collection('users').doc(pub.user_id);
            const userSnap = await trans.get(userRef);
            let newCount = (userSnap.data().num_publications || 0) + 1;
            return trans.update(userRef, { 'num_publications': newCount });
        });
    });
exports.updateRemovePubs = functions.firestore.document('publications/{publicationId}')
    .onDelete((snap, context) => {
        let pub = snap.data();
        firestore.runTransaction(async (trans) => {
            let userRef = firestore.collection('users').doc(pub.user_id);
            const userSnap = await trans.get(userRef);
            let newCount = (userSnap.data().num_publications || 1) - 1;
            return trans.update(userRef, { 'num_publications': newCount });
        });
    });

exports.updateAddReplies = functions.firestore.document('replies/{replyId}')
    .onCreate((snap, context) => {
        let reply = snap.data();
        firestore.runTransaction(async (trans) => {
            let userRef = firestore.collection('users').doc(reply.user_id);
            let userSnap = await trans.get(userRef);
            let newCount = (userSnap.data().num_replies || 0) + 1;
            return trans.update(userRef, { 'num_replies': newCount });
        });
        if (reply.publication_id) {
            firestore.runTransaction(async (trans) => {
                let pubRef = firestore.collection('publications').doc(reply.publication_id);
                let pubSnap = await trans.get(pubRef);
                let newCount = (pubSnap.data().num_replies || 0) + 1;
                return trans.update(pubRef, { 'num_replies': newCount });
            });
        }
        if (reply.reply_id) {
            firestore.runTransaction(async (trans) => {
                let replyRef = firestore.collection('replies').doc(reply.reply_id);
                const replySnap = await trans.get(replyRef);
                let newCount = (replySnap.data().num_replies || 0) + 1;
                return trans.update(replyRef, { 'num_replies': newCount });
            });
        }
    });
exports.updateRemoveReplies = functions.firestore.document('replies/{replyId}')
    .onDelete((snap, context) => {
        let reply = snap.data();
        firestore.runTransaction(async (trans) => {
            let userRef = firestore.collection('users').doc(reply.user_id);
            let userSnap = await trans.get(userRef);
            let newCount = (userSnap.data().num_replies || 1) - 1;
            return trans.update(userRef, { 'num_replies': newCount });
        });
        if (reply.publication_id) {
            firestore.runTransaction(async (trans) => {
                let pubRef = firestore.collection('publications').doc(reply.publication_id);
                let pubSnap = await trans.get(pubRef);
                let newCount = (pubSnap.data().num_replies || 1) - 1;
                return trans.update(pubRef, { 'num_replies': newCount });
            });
        }
        if (reply.reply_id) {
            firestore.runTransaction(async (trans) => {
                let replyRef = firestore.collection('replies').doc(reply.reply_id);
                const replySnap = await trans.get(replyRef);
                let newCount = (replySnap.data().num_replies || 1) - 1;
                return trans.update(replyRef, { 'num_replies': newCount });
            });
        }
    });


exports.updateAddFollows = functions.firestore.document('followers/{followId}')
    .onCreate((snap, context) => {
        let follow = snap.data();
        firestore.runTransaction(async (trans) => {
            let userRef = firestore.collection('users').doc(follow.user_id);
            const userSnap = await trans.get(userRef);
            let newCount = (userSnap.data().num_follows || 0) + 1;
            return trans.update(userRef, { 'num_follows': newCount });
        });
        firestore.runTransaction(async (trans) => {
            let pubRef = firestore.collection('publications').doc(follow.publication_id);
            const pubSnap = await trans.get(pubRef);
            let newCount = (pubSnap.data().num_followers || 1) + 1;
            return trans.update(pubRef, { 'num_followers': newCount });
        });
    });
exports.updateRemoveFollows = functions.firestore.document('followers/{followId}')
    .onDelete((snap, context) => {
        let follow = snap.data();
        firestore.runTransaction(async (trans) => {
            let userRef = firestore.collection('users').doc(follow.user_id);
            const userSnap = await trans.get(userRef);
            let newCount = (userSnap.data().num_follows || 1) - 1;
            return trans.update(userRef, { 'num_follows': newCount });
        });
        firestore.runTransaction(async (trans) => {
            let pubRef = firestore.collection('publications').doc(follow.publication_id);
            const pubSnap = await trans.get(pubRef);
            let newCount = (pubSnap.data().num_followers || 1) - 1;
            return trans.update(pubRef, { 'num_followers': newCount });
        });
    });