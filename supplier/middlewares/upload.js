const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/uploads/");
  },

  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);

    const filename = file.originalname
      .replace(new RegExp(fileExt + "$"), "")
      .toLowerCase()
      .split(" ")
      .join("-");

    cb(null, `${Date.now()}-${filename}${fileExt}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${file.mimetype}`));
  }
};

const upload = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
