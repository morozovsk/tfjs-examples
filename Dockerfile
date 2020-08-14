FROM ubuntu:20.04

RUN apt update

RUN export DEBIAN_FRONTEND=noninteractive && apt install -y git curl wget nodejs npm mc

RUN git clone https://github.com/morozovsk/tfjs-examples.git && cd tfjs-examples && npm install
