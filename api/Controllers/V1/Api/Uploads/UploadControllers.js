const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const Upload = require('../../../../Models/Upload');

exports.store = async (req, res) => {
  console.log(req.kitchen);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were selected.');
  }

  let uploads = [];
  let photos = Object.values(req.files);
  let isMultiple = false;
  photos.forEach((photo) => {
    if (Array.isArray(photo)) {
      isMultiple = true;
    } else {
      isMultiple = false;
    }
  });

  photos = isMultiple ? Object.values(req.files.photos) : photos;

  photos.forEach(async (photo) => {
    const name = `${Math.random(0, 10012)}-${Math.random(0, 2000)}-${
      photo.name
    }`;
    photo.mv(`uploads/server/images/${name}`);
    const save_path = `server/images/${name}`;
    uploads.push({
      name: photo.name,
      save_path,
      save_name: name,
      kitchen: req.kitchen._id,
    });
  });
  uploads = await Upload.insertMany(uploads);

  res.status(200).json({
    uploads,
    message: 'Files Uploaded Successfully!',
  });
};
