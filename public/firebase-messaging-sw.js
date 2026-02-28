
importScripts('https://www.gstatic.com/firebasejs/9.8.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.8.3/firebase-messaging-compat.js');
var firebaseConfig = {

//   apiKey: "AIzaSyAJwnwdNFm2H4dTLddq4nB3Xuwcw9gBnZ8",
//  authDomain: "woo-vista.firebaseapp.com",
//  projectId: "woo-vista",
//  storageBucket: "woo-vista.appspot.com",
//  messagingSenderId: "391151148487",
//  appId: "1:391151148487:ios:dfe6148b467caa0d4f8de2",
//  databaseURL: 'https://woo-vista.firebaseapp.com',

apiKey: "AIzaSyBuuMKzba2S_Qopk3prQPUtOyV1VyEv9uQ",
authDomain: "woo-vista.firebaseapp.com",
projectId: "woo-vista",
storageBucket: "woo-vista.appspot.com",
messagingSenderId: "391151148487",
appId: "1:391151148487:web:70442667eaaf61a24f8de2",
measurementId: "G-7QDGBR1QCF"

};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});



