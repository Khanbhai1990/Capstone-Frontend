FROM node:alpine

COPY ./dist /Capstone-Frontend/dist/
COPY ./index.html /Capstone-Frontend/
COPY ./src/assets /Capstone-Frontend/src/assets/

WORKDIR /Capstone-Frontend

RUN npm i -g http-server

EXPOSE 80