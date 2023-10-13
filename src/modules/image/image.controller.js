import { db } from "../../../index.js";
import cloudinary from "../../utils/cloudinary.js";
const createImg = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    let { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "task/images",
      }
    );

    req.body.image = { secure_url, public_id };
  }
  let data = {
    name: req.file.originalname,
    image: req.body.image,
  };

  await db.collection("images").add(data);
  res.json("success");
};

const getAllImgs = async (req, res, next) => {
  try {
    const imagesRef = db.collection("images");
    const result = await imagesRef.get();
    let resultArr = [];
    result.forEach((doc) => resultArr.push(doc.data()));
    res.json({ message: "success", resultArr });
  } catch (err) {
    console.log(err);
  }
};

const getImgById = async (req, res, next) => {
  try {
    const imagesRef = db.collection("images").doc(req.params.id);
    console.log(imagesRef);
    const result = await imagesRef.get();

    if (!result.data()) return res.json({ message: "doc not exist" });
    res.json({ message: "success", result: result.data() });
  } catch (err) {
    console.log(err);
  }
};

const updateImg = async (req, res, next) => {
  try {
    if (req.file) {
      console.log(req.file);
      let { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "task/images",
        }
      );

      req.body.image = { secure_url, public_id };
    }

    const imagesRef = db.collection("images").doc(req.params.id);
    let result = await imagesRef.get();

    if (!result.data()) return res.json({ message: "doc not exist!" });
    let updated = await imagesRef.update({
      name: req.file.originalname,
      image: req.body.image,
    });

    res.json({ message: "success", result: updated.data() });
  } catch (err) {
    console.log(err);
  }
};

const deleteImg = async (req, res, next) => {
  try {
    const imagesRef = db.collection("images").doc(req.params.id);
    let result = await imagesRef.get();

    if (!result.data()) return res.json({ message: "doc not exist!" });

    await imagesRef.delete();
    res.json({ message: "success" });
  } catch (err) {
    console.log(err);
  }
};
export { createImg, getAllImgs, getImgById, updateImg, deleteImg };
