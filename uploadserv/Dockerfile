FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 6970

CMD [ "node", "app.js" ]