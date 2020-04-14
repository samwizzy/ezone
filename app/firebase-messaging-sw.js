importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '344064508183', // change this to prod once ready
  });

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler((payload) => {
  // Parses data received and sets accordingly
  console.log(payload, 'payload');
  const data = JSON.parse(payload.data.notification);
  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body,
    icon: 'icon-96.png',
    data: {
      url: data.data.url
    }
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
/**
 * You can also set a handler once you click the notification
 */
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(`${event.notification.data.url}/?utm_source=push`)
  );
})