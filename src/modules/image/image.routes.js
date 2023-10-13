import express from "express";
import uploadFileOnCloud from "../../middleware/multer.js";
import {
  createImg,
  deleteImg,
  getAllImgs,
  getImgById,
  updateImg,
} from "./image.controller.js";

const imageRouter = express.Router();

// add image
imageRouter.post("/", uploadFileOnCloud().single("image"), createImg);

// get all images
imageRouter.get("/", getAllImgs);

// get image by id
imageRouter.get("/:id", getImgById);

// update Image
imageRouter.put("/:id", uploadFileOnCloud().single("image"), updateImg);

// delete Image
imageRouter.delete("/:id", deleteImg);

export default imageRouter;
