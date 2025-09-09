FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install sequelize mysql2 mariadb
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

