#! /bin/bash

# You may need to run chmod +x on this file.

npm i
npm run build

docker-compose up --build -d
