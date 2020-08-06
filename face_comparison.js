const fs = require('fs');

//const tf = require('@tensorflow/tfjs');
const tf = require('@tensorflow/tfjs-node');
//const tf = require('@tensorflow/tfjs-node-gpu');

const faceapi = require('face-api.js');

//const canvas = require('canvas');
//const { Canvas, Image, ImageData } = canvas;
//faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const start = async function() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./weights');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./weights');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./weights');

    // load image and convert to tensor
    var img1 = tf.node.decodeImage(fs.readFileSync('images/leonard/bbt1.jpg'));
    //console.log(img1)

    // get all faces with descriptors
    var detections1 = await faceapi.detectAllFaces(img1, new faceapi.SsdMobilenetv1Options({minConfidence: 0.5})).withFaceLandmarks().withFaceDescriptors();

    // get descriptor for first face
    // detections1[0].descriptor;

    var img2 = tf.node.decodeImage(fs.readFileSync('images/leonard/bbt3.jpg'));

    var detections2 = await faceapi.detectAllFaces(img2, new faceapi.SsdMobilenetv1Options({minConfidence: 0.5})).withFaceLandmarks().withFaceDescriptors();

    var distance = faceapi.euclideanDistance(detections1[0].descriptor, detections2[0].descriptor);
    console.log(distance);
};

start();
