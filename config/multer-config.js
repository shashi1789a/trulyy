const multer = require("multer");

const storage = multer.memoryStorage(); // important to use buffer
const upload = multer({ storage: storage });

module.exports = upload;

