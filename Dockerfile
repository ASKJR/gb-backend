FROM node:11-alpine

LABEL maintainer="Alberto Kato"

WORKDIR /application

# Base system dependencies
RUN apk add --no-cache \
    curl \
    git \
    bash

RUN apk upgrade libssl1.0 --update-cache

RUN apk add wget ca-certificates


COPY package*.json ./

RUN npm install -y

RUN npm install -g sequelize

RUN npm install -g sequelize-cli

RUN npm install -g mysql2

COPY . .


EXPOSE 80
