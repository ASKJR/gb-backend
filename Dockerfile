FROM node:12-alpine

LABEL maintainer="Alberto Kato"

WORKDIR /application

COPY package*.json ./

RUN npm install -y

RUN npm install -g sequelize

RUN npm install -g sequelize-cli

RUN npm install -g mysql2

COPY . .


EXPOSE 80
