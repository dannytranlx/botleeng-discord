FROM node:latest

WORKDIR /usr/src/botleeng

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
