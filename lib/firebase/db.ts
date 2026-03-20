import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (!serviceAccountBase64) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable is not set.",
    );
  }

  try {
    // Decode the Base64 string to get the service account JSON string
    const serviceAccountJson = Buffer.from(
      serviceAccountBase64,
      "base64",
    ).toString("utf8");
    const serviceAccount = JSON.parse(serviceAccountJson);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
    throw new Error(
      "Failed to initialize Firebase Admin SDK. Check service account credentials.",
    );
  }
}

export const db = admin.database();
