import * as service from './service/event';
import multer from 'multer';
import s3 from 'multer-s3';
import path from 'path';
// import sizeOf from 'image-size';
require('dotenv').config();
import size from 's3-image-size';
var AWS = require('aws-sdk');

export function getEvents(req, res) {
  service.getEvents()
  .then((events) => res.json(events))
  .catch(err => {
    res.status(400);
    res.json({error: err});
  });
}

export function uploadImage(req, res) {
  const options = s3({
    dirname: 'uploads/images',
    bucket: 'projectsuploads',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'eu-west-1',
    filename: (req, file, cb) => {
      cb(null, (Math.random().toString(36)+'00000000000000000').slice(2, 10) + Date.now() + path.extname(file.originalname));
    }
  })
  const uploading = multer({ storage: options }).array('file');
  uploading(req, res, err => {
    let files = []

    const p1 = new Promise((resolve, reject) => {
      req.files.map((file) => {
        files.push({key:file.key.replace("uploads/images/", "")});
      })

      resolve(files);
    });

    p1.then((files) => res.json(files))
    p1.catch(err => {
      res.status(400);
      res.json({error: err, event: req.body});
    });
  })
}

export function addEvent(req, res) {
  service.addEvent(req.body)
  .then((event) => res.json(event))
  .catch(err => {
    res.status(400);
    res.json({error: err, event: req.body});
  });
}

export function editEvent(req, res) {
  service.editEvent(req.params.id, req.body)
  .then((event) => res.json(event))
  .catch(err => {
    res.status(400);
    res.json({error: err, event: req.body});
  });
}

export function deleteEvent(req, res) {
  service.deleteEvent(req.params.id)
  .then((event) => res.json(event))
  .catch(err => {
    res.status(400);
    res.json({error: err, event: req.body});
  });
}

export function getEvent(req, res) {
  service.getEvent(req.params.slug)
  .then((event) => res.json(event))
  .catch(err => {
    console.log(err)
    res.status(400);
    res.json({error: err, event: req.body});
  });
}
