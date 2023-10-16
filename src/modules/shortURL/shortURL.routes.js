import express from "express";
import { createShortURL, getShortURL } from "./shortURL.controller.js";

const shortUrlRouter = express.Router();

// add url
shortUrlRouter.post("/", createShortURL);

// get url
shortUrlRouter.get("/:shortUrl", getShortURL);

export default shortUrlRouter;
