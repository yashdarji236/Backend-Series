const ImageKit = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
 
});

async function postController(req, res) {
  console.log(req.body, req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const file = await imageKit.files.upload({
    file: req.file.buffer.toString("base64"), 
    fileName: req.file.originalname
  });

  res.send(file);
}

module.exports = {
  postController
};
