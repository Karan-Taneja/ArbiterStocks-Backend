import app from 'firebase/app';
import 'firebase/auth';

const config = {
apiKey: "AIzaSyByEyZz2vjAt6lTvNNRuKkpnYYQsLDbOv0",
authDomain: "testauth-97b99.firebaseapp.com",
databaseURL: "https://testauth-97b99.firebaseio.com",
projectId: "testauth-97b99",
storageBucket: "testauth-97b99.appspot.com",
messagingSenderId: "755977284158"
};

app.initializeApp(config);

export default app;