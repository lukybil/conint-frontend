FROM node:17-alpine

COPY . ./app
WORKDIR ./app

RUN npm install

EXPOSE 3000

CMD npm run start