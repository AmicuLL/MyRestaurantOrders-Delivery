const multer = require('multer');

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/media/menu photos'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  }
});

const upload = multer({ storage });

module.exports = (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err) {
      console.error('Error uploading file:', err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
};
