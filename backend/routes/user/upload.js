const express = require("express");
const router = express.Router();
const uploadFilesMiddleware = require("../../middleware/upload");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const user = require('../../model/user');

const url = process.env.MONGO_DB_URL;
const baseUrl = process.env.MONGO_DB_URI;
const mongoClient = new MongoClient(url);

// this function handles the upload request
const uploadFiles = async (req, res) => {
  const user_id = req.session.passport.user.id;
  try {
    await uploadFilesMiddleware(req, res); // this middleware handles upload
    console.log(req.file);
    return res.send({
      message: "File has been uploaded.",
      file: req.file
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
};

// this function handles the upload requestfor users profile pic
const uploadUserImg = async (req, res) => {
  // const user_id = req.session.passport.user.id;
  const user_id = req.params.id;
  try {
    await uploadFilesMiddleware(req, res); // this middleware handles upload
    console.log(req.file);
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }
    const user_data = await user.updateOne(
      { _id: user_id },
      {
        profile_pic_url: req.file.filename
      });
    if (user_data.modifiedCount) {
      return res.send({
        message: "User image updated.",
        file: req.file
      });
    } else {
      return res.send({
        message: "User image not updated!",
        file: req.file
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
};

const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(process.env.DB_NAME);
    const images = database.collection(process.env.USER_IMG_BUCKET + ".files");
    const cursor = images.find({});

    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }

    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

// this route handles the fetch request of the files
const download = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(process.env.DB_NAME);
    const bucket = new GridFSBucket(database, {
      bucketName: process.env.USER_IMG_BUCKET,
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.name);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

const uploadController = {
  uploadFiles,
  getListFiles,
  uploadUserImg,
  download,
};

router.post("/user/upload", uploadController.uploadFiles);
router.post("/user/:id/uploadProfilePic", uploadController.uploadUserImg);
router.get("/user/files", uploadController.getListFiles);
router.get("/user/files/:name", uploadController.download);

module.exports = router;
