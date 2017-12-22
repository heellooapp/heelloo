const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://teamon-68ca0.firebaseio.com"
});

exports.deleteUser = functions.https.onRequest((req, res) => {
  const uid = req.query.uid;
  admin.database().ref('/users/' + uid).remove();
  admin.database().ref('/userInfo/' + uid).remove();
  admin.auth().deleteUser(uid).then(function(snapshot) {
    res.redirect(303, "Success");
  })
  .catch(function(error) {
    console.log(error);
  });
});

exports.createUser = functions.https.onRequest((req, res) => {
  let {email, password} = req.query;

  admin.auth().createUser({email: email, password: password})
  .then(function(userRecord) {
    res.redirect(303, userRecord);
  })
  .catch(function(error) {
    console.log(error);
  });
});