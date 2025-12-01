# DSpot ERP E2E dependencies image

FROM node:20.11.1-alpine3.19 AS builder

# Set Python interpreter for `node-gyp` to use
ENV PYTHON=/usr/bin/python

RUN apk --update add bash \
    && apk add --no-cache build-base postgresql postgresql-contrib \
    && npm i -g npm@9 node-gyp@10.2.0 yarn --force \
    && mkdir /srv/gauzy \
    && chown -R node:node /srv/gauzy \
    && rm -rf /var/cache/apk/*

USER node:node
WORKDIR /srv/gauzy

# Copy related project files and configuration files
COPY --chown=node:node . .

# Install ALL dependencies needed for e2e testing
RUN NODE_ENV=development yarn install \
    --network-timeout 1000000 \
    --frozen-lockfile \
    --ignore-scripts \
    --link-duplicates \
    && NODE_ENV=development yarn postinstall.manual \
    && yarn cache clean
