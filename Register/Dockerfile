FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 6968

CMD [ "node", "app.js" ]