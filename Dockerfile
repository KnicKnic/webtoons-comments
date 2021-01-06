FROM node:alpine@sha256:7d8fcef4cc84dafe2f4fbcbcd58ee704d452f1e49bc3393c9452992713808dbc

COPY . /app
WORKDIR /app
RUN npm install --production


CMD node index.js