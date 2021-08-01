FROM node:alpine@sha256:a55cd676d1aec59d871855b86984063c8854e67a7f552af66418c5068103a509

COPY . /app
WORKDIR /app
RUN npm install --production


CMD node index.js