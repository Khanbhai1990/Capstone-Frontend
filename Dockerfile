FROM node:alpine

COPY ./dist /Capstone-Frontend/dist/
COPY ./index.html /Capstone-Frontend/
COPY ./src/assets /Capstone-Frontend/src/assets/
COPY ./package.json /Capstone-Frontend/

WORKDIR /Capstone-Frontend

RUN npm i -g http-server

CMD ["npm", "run", "serve"]
