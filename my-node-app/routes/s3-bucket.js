const AWS = require('aws-sdk')
const S3 = require('aws-sdk/clients/s3')
const imageThumbnail = require('image-thumbnail')
require('dotenv').config()

const fs = require('fs')
const { uuid } = require('uuidv4')


const bucketName = process.env.AWS_S3_BUCKET_NAME
const region = process.env.AWS_S3_BUCKET_REGION
const accessKeyId = process.env.AWS_S3_ACCESS_KEY
const secretAccessKey = process.env.AWS_S3_SECRET_KEY

const s3_bucket = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadImage(file) {

    const imageStream = fs.createReadStream(file.path)
    const imageParams = {
        Bucket: bucketName,
        Body: imageStream,
        Key: `raw-images/${file.filename}`,
        ACL: 'public-read'
    }


    return s3_bucket.upload(imageParams).promise()
}

exports.uploadImage = uploadImage

function uploadThumbImage(file) {

    const options = {

        width: 200,
        height: 200,
        jpegOptions: {
            force: true,
            quality: 90
        }
    }

    imageThumbnail(file.path, options).then(data => {

        const uploadS3 = async (stream) => {
            fileName = uuid() + '.jpeg'

            const imageParams = {
                Bucket: bucketName,
                Body: stream,
                Key: `thumbnail-images/${fileName}`,
                ACL: 'public-read'
    
            }
            console.log(fileName)
          return  await s3_bucket.putObject(imageParams).promise()
            
        }

        uploadS3(data)

    }).catch(err => {
        console.log(err)
    })
}

exports.uploadThumbImage = uploadThumbImage



function getImageFile(filename) {

    const getImageParams = {
        Bucket: bucketName,
        Key: `thumbnail-images/${filename}`

    }

    return s3_bucket.getObject(getImageParams).promise()
}

function getRawImageFile(filename) {

    const getImageParams = {
        Bucket: bucketName,
        Key: `raw-images/${filename}`

    }

    return s3_bucket.getObject(getImageParams).promise()
}

exports.getRawImageFile =getRawImageFile

function getAllImages(){

    return s3_bucket.listObjectsV2({Bucket: bucketName}).promise()
}

exports.getAllImages = getAllImages

exports.getImageFile = getImageFile

function deleteImage(file){
    getParams = {
        Bucket: bucketName,
        Key: `thumbnail-images/${file}`
    }

    s3_bucket.deleteObject(getParams, (err, data) => {
        if(err){
            console.log(err)
        }else {
            console.log('successfully deleted!')
        }
    })
}
exports.deleteImage = deleteImage

function deleteRawImage(file){
    getParams = {
        Bucket: bucketName,
        Key: `raw-images/${file}`
    }

    s3_bucket.deleteObject(getParams, (err, data) => {
        if(err){
            console.log(err)
        }else {
            console.log('successfully deleted!')
        }
    })
}

exports.deleteRawImage= deleteRawImage