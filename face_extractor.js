const fs = require('fs');
const faceapi = require('face-api.js');
const tf = require('@tensorflow/tfjs-node');
const sharp = require('sharp');

const start = async function() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./weights');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./weights');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./weights');


    var file = 'images/bbt5.jpg';

    var img = tf.node.decodeImage(fs.readFileSync(file));

    // get all faces with descriptors
    var detections = await faceapi.detectAllFaces(img, new faceapi.SsdMobilenetv1Options({minConfidence: 0.5})).withFaceLandmarks().withFaceDescriptors();

    for (var i in detections) {
        var box = detections[i].detection.box;
        //console.log(box);
        img = sharp(file);
        var metadata = await img.metadata();
        //console.log(metadata);
        var faceBox = {
            width: Math.round(box.width*2 + box.x < metadata.width ? box.width * 2 : metadata.width - box.x),
            height: Math.round(box.height*2 + box.y < metadata.height ? box.height * 2 : metadata.height - box.y),
            left: Math.round(box.x - box.width/2 > 0 ? box.x - box.width/2 : 0),
            top: Math.round(box.y - box.height/2 > 0 ? box.y - box.height/2 : 0)
        };
        img.extract(faceBox).toFile(`images/faces/bbt5_${i}.png`);

        //box = detections[i].alignedRect.box;
        //console.log(box);
    }
};

start();
