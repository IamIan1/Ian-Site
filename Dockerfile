FROM node:16.14.0-alpine
WORKDIR /ian-site
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
