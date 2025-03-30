import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: process.env.FIREBASE_DATABASE_URL, // Remove or comment out if not using it
});

export default admin;
