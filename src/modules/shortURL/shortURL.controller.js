import { db } from "../../../index.js";
import ShortUniqueId from "short-unique-id";
const uid = new ShortUniqueId({ length: 10 });
const createShortURL = async (req, res, next) => {
  let data = {
    fullURL: req.body.fullURL,
    shortURL: uid.rnd(),
  };

  await db.collection("urls").add(data);
  res.json({ message: "success" });
};
const getShortURL = async (req, res, next) => {
  //   console.log(req.params);
  const urlRef = db.collection("urls");
  let respose = await urlRef.get();
  let result = [];
  respose.forEach((doc) => result.push(doc.data()));
  //   console.log(result);
  let url = result.filter((ele) => ele.shortURL === req.params.shortUrl);
  //   console.log(url[0]);
  // res.json({ url: url[0].fullURL });
  res.redirect(url[0].fullURL);
};

export { createShortURL, getShortURL };
