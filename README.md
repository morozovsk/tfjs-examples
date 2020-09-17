# tfjs-examples

tested on:
* ubuntu 20.04

installation:
* git clone https://github.com/morozovsk/tfjs-examples.git && cd tfjs-examples
* npm install

update:
* cd tfjs-examples && git pull
* npm install

using:
* nodejs face_comparison.js
* nodejs face_recognition.js
* nodejs face_extractor.js
* nodejs face_extractor_dir.js

dependencies installation:
* apt update && apt install -y git curl wget nodejs npm make g++

docker:
* git clone https://github.com/morozovsk/tfjs-examples.git && cd tfjs-examples
* docker build -t tfjs-examples .
* docker run -it tfjs-examples bash
* cd tfjs-examples && nodejs face_comparison.js
