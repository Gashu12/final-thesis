const express = require('express');
const router = express.Router()
const S3 = require('aws-sdk/clients/s3')

const fs = require('fs')
const util = require('util')

const unLinkImage = util.promisify(fs.unlink)

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadImage, getImageFile, uploadThumbImage, getAllImages, deleteImage, deleteRawImage } = require('./s3-bucket')

const bucketName = process.env.AWS_S3_BUCKET_NAME
const region = process.env.AWS_S3_BUCKET_REGION
const accessKeyId = process.env.AWS_S3_ACCESS_KEY
const secretAccessKey = process.env.AWS_S3_SECRET_KEY

const s3_bucket = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

router.get('/', async (req, res, next) => {
  try {

    const allImagelists = await getAllImages()
    console.log(allImagelists.Contents)
    res.send({ result: allImagelists.Contents })
  } catch (err) {
    res.send({ status: false, Error: 'Error while listting images' })
  }

})


/* router.get('/:key', (req, res, next) => {

  const filename = req.params.key
  const str = '.jpeg'
  console.log(filename)
  if (filename) {
    if (!filename.includes(str)) {
      const getImageParams = {
        Bucket: bucketName,
        Key: `raw-images/${filename}`

    }

    const encode = (data) => {
      let buf = Buffer.from(data);
      let base64 = buf.toString('base64');
      return base64
    }

    s3_bucket.getObject(getImageParams, (err, rest) => {
      if(err) throw err
      const html = `<html><body><img src='data:image/jpeg;base64,${encode(rest.Body)}'/></body></body></html>`
      res.send(html)
    })
 
    }
    else {
      getImageFile(filename).then(data => {
        console.log(typeof data)
        if (data) {
          res.send({ status: 'success', result: data.Body })
        }
      })
    }
  } else {
    res.send({ status: false, Error: 'Error while getting the image' })
  }
}) */

router.post('/', upload.single('image'), async (req, res, next) => {

  try {
    const file = req.file
    const data = await uploadImage(file)
    uploadThumbImage(file)
    console.log(data)
    await unLinkImage(file.path)
    const key = data.Key

    res.send({ imagePath: `/images/${key}` })
  } catch (err) {
    res.send({ status: false, Error: err })
  }
})


router.delete('/:key', async (req, res, next) => {
  const param = req.params.key
  const str = '.jpeg'
  console.log(param)
  if (param.includes(str)) {
    await deleteImage(param)
    res.send({ status: 'successfully deleted!' })
  } else {
    await deleteRawImage(param)
    res.send({ status: 'successfully deleted!' })
  }

})

module.exports = router;

