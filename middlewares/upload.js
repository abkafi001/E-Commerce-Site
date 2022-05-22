const multer = require("multer");

const storage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      cb(null, "/tmp/uploads/");
    },
  },
  {
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname + "-");
    },
  }
);

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${file.mimetype}`));
  }
};

const upload = multer.upload({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
