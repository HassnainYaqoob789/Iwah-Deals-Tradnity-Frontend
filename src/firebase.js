// import { initializeApp } from 'firebase/app';
// import { getAuth} from 'firebase/auth'

// const firebaseConfig = {
//   apiKey: "AIzaSyAd2iWX6KERL7nNeDB-FaakG4GBiVehoHU",
//   authDomain: "tradnity-571d0.firebaseapp.com",
//   projectId: "tradnity-571d0",
//   storageBucket: "tradnity-571d0.appspot.com",
//   messagingSenderId: "452863388486",
//   appId: "1:452863388486:web:17dc5f33e0b846fa54d347",
//   measurementId: "G-JKZG387YBF"
// };
// initializeApp(firebaseConfig);


// export const auth = getAuth()

// const messaging = getMessaging();
// export const requestForToken = () => {
//   return getToken(messaging, { vapidKey: `BNOA7wow99TGMGygmDiEx8vTTNoPVjiHJEowKJGHQyclFiKmUeBfsgMyE_LnGSpF9DAR3xvVcwCjpCGhN9f90YU` })
//     .then((currentToken) => {
//       if (currentToken) {
//         store.dispatch(sendfcp_token({'token':currentToken}));
//         getMessaging().subscribeToTopic('fV1Q7-XYbltYEL04N6C2-R:APA91bF1B2NSlh1tbWPZghftQPo8B5ibv6ZTL5Pgf6-rQow_rQWKlTACKbHh14_dTjjZrE4q3EJAK_SkEivzpy1S01cUd8XC1GmbCL9ZHXcHzSTD8o2v96FA1artj6_gJ1RYyDkVUdLe', '/topics/makki')
//         .then((response) => {
//           console.info('Successfully subscribed to topic:', response);
//         })
//       } else {
//         // Show permission request UI
//         console.warn('No registration token available. Request permission to generate one.');
//       }
//     })
//     .catch((err) => {
//       console.warn('An error occurred while retrieving token. ', err);
//     });
// };
// export const onMessageListener = () =>
//   new Promise((resolve) => {    
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });
