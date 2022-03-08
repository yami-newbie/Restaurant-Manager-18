var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
var firestoreService = require('firestore-export-import');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://quanlynhahang-b44c4-default-rtdb.asia-southeast1.firebasedatabase.app",
});


firestoreService.restore('./testData.json');