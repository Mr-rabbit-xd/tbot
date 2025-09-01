// web.js
require("dotenv").config();
const express = require("express");
const admin = require("./lib/firebase");

const app = express();
app.use(express.json());

const dbFS = admin.firestore();

// ✅ Key validate API
app.post("/api/validate", async (req, res) => {
  const { key } = req.body || {};
  if (!key) return res.status(400).json({ ok: false, error: "Missing key" });

  const ref = dbFS.collection("keys").doc(key);
  const snap = await ref.get();

  if (!snap.exists) return res.status(404).json({ ok: false, error: "Invalid key" });

  const data = snap.data();
  const now = Date.now();

  if (data.status !== "active")
    return res.status(403).json({ ok: false, error: "Not active" });

  if (data.expiry && new Date(data.expiry).getTime() < now)
    return res.status(403).json({ ok: false, error: "Expired" });

  res.json({ ok: true, key, expiry: data.expiry });
});

// Health check
app.get("/", (_, res) => res.send("OK"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🌐 Web listening on :${PORT}`));
