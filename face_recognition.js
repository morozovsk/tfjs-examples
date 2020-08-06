const fs = require('fs');

const tf = require('@tensorflow/tfjs-node');

const faceapi = require('face-api.js');

const start = async function() {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./weights');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./weights');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./weights');


    var descriptors_with_labels = [];

    var files = fs.readdirSync('images/all/');

    for (var j in files) {

        //console.log(files[j]);
        var img = tf.node.decodeImage(fs.readFileSync('images/all/' + files[j]));

        if (img.shape.length !== 3 || img.shape[2] !== 3) {
            console.log(img);
            continue;
        }

        var detections = await faceapi.detectAllFaces(img, new faceapi.SsdMobilenetv1Options({minConfidence: 0.5})).withFaceLandmarks().withFaceDescriptors();
        //console.log(detections);
        if (detections.length && typeof detections[0].descriptor !== 'undefined') {
            //descriptors.push(Object.values(detections[0].descriptor));
            //descriptors2person.push(parseInt(i));
            descriptors_with_labels.push(new faceapi.LabeledFaceDescriptors(files[j].split('.')[0], [detections[0].descriptor]));

        }
    }

    var img = tf.node.decodeImage(fs.readFileSync('images/leonard/bbt3.jpg'));
    //console.log(img1)

    // get all faces with descriptors
    var detections = await faceapi.detectAllFaces(img, new faceapi.SsdMobilenetv1Options({minConfidence: 0.5})).withFaceLandmarks().withFaceDescriptors();

    // get descriptor for first face
    // detections1[0].descriptor;

    const bestMatch = new faceapi.FaceMatcher(descriptors_with_labels).findBestMatch(detections[0].descriptor);
    console.log(bestMatch);
};

start();
