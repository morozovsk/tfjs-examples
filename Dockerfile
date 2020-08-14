FROM ubuntu:20.04

RUN apt update && export DEBIAN_FRONTEND=noninteractive && apt install -y git curl wget nodejs npm mc

RUN git clone https://github.com/morozovsk/tfjs-examples.git && cd tfjs-examples && npm install

RUN npm install -g n && n 14.8.0 && \
    ln -sf /usr/local/n/versions/node/14.8.0/bin/node /usr/bin/nodejs && \
    ln -sf /usr/local/n/versions/node/14.8.0/bin/npm /usr/bin/npm && \
    ln -sf /usr/local/n/versions/node/10.19.0/bin/node /usr/bin/node
