import Firebase from './firebase-install';
const messaging = Firebase.messaging();
messaging.usePublicVapidKey(
  // Project Settings => Cloud Messaging => Web Push certificates
  'BCUQssuQpbpZaHNoBwubH0UyFE4U4IBLHkAaX0kPiTTcwx1soZxDSD5wgT9htFju1A5x9tyoeDaW0FG4vvfoiCs',
);
export { messaging };
