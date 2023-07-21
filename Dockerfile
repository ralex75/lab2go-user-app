FROM node:latest
WORKDIR /usr/src/app
COPY ./data/package*.json ./
RUN npm install
COPY ./data/ .
EXPOSE 3000
CMD ["npm","start"]
