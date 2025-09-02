const admin = require("firebase-admin");

function initFirebase() {
  if (admin.apps.length) return admin;

  const saB64 = process.env.FIREBASE_SA_BASE64;
  if (!saB64) throw new Error("FIREBASE_SA_BASE64 missing in env");

  const saJson = JSON.parse(Buffer.from(saB64, "base64").toString("utf-8"));

  admin.initializeApp({
    credential: admin.credential.cert(saJson),
  });

  return admin;
}

module.exports = initFirebase();
