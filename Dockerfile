FROM node:alpine

COPY . /app
WORKDIR /app
RUN npm install --production


CMD node index.js