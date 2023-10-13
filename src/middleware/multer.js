import multer from "multer";

const uploadFileOnCloud = () => {
  const storage = multer.diskStorage({});

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("invalid extention", false);
    }
  };
  const upload = multer({ fileFilter, storage });
  return upload;
};

export default uploadFileOnCloud;
