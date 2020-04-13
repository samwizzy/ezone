const prodConfig = {
  apiKey: 'AIzaSyBrU8UkWYfWRmab8hxcKLW2yce77HQ6ceM',
  authDomain: 'ezone-3c896.firebaseapp.com',
  databaseURL: 'https://ezone-3c896.firebaseio.com',
  projectId: 'ezone-3c896',
  storageBucket: 'ezone-3c896.appspot.com',
  messagingSenderId: '344064508183',
  appId: '1:344064508183:web:7266af1dfe1e67b91eb752',
  measurementId: 'G-1EDRL6TFLF',
  // apiKey           : "YOUR_API_KEY",
  // authDomain       : "your-app.firebaseapp.com",
  // databaseURL      : "https://your-app.firebaseio.com",
  // projectId        : "your-app",
  // storageBucket    : "your-app.appspot.com",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const devConfig = {
  apiKey: 'AIzaSyBrU8UkWYfWRmab8hxcKLW2yce77HQ6ceM',
  authDomain: 'ezone-3c896.firebaseapp.com',
  databaseURL: 'https://ezone-3c896.firebaseio.com',
  projectId: 'ezone-3c896',
  storageBucket: 'ezone-3c896.appspot.com',
  messagingSenderId: '344064508183',
  appId: '1:344064508183:web:7266af1dfe1e67b91eb752',
  measurementId: 'G-1EDRL6TFLF',
  // apiKey           : "YOUR_API_KEY",
  // authDomain       : "your-app.firebaseapp.com",
  // databaseURL      : "https://your-app.firebaseio.com",
  // projectId        : "your-app",
  // storageBucket    : "your-app.appspot.com",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
