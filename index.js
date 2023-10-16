import express from "express";
import cloudinary from "./src/utils/cloudinary.js";
import admin from "firebase-admin";
import credential from "./firestore-key.json" assert { type: "json" };

import imageRouter from "./src/modules/image/image.routes.js";
import shortUrlRouter from "./src/modules/shortURL/shortURL.routes.js";

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(credential),
});

export const db = admin.firestore();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/image", imageRouter);

app.use("/shortUrl", shortUrlRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}`);
});
