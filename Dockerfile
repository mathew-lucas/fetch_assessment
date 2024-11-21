FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY src ./src

EXPOSE 3000

CMD ["node", "src/app.js"]