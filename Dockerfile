FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "NODE_ENV=production node dist/index.js" ]
