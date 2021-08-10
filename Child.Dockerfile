FROM node:15.12.0-alpine3.13
RUN npm install -g webpack-cli
RUN npm install -g webpack
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run compile
EXPOSE 3002
CMD [ "npm", "start" ]