FROM node:16.14.0-alpine
WORKDIR /ian-site/client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]