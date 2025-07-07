FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Start both main app and email worker
CMD ["npm", "start"]
