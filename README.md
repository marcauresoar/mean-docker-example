
# Legacy Utils

This project was created to offer some utilities to Fiat legacy code. It was built using MEAN (MongoDB, Express, AngularJS and NodeJS) and Docker.

## Requirements

In order to develop and run this project, you'll need the following softwares installed in your machine:

- NodeJs
- Docker and Docker Compose

## Running the project

Before anything, you need to enter the `angular-client/` and `express-server/` directories, and install the dependencies, like the example below:

    cd angular-client/ && npm install && cd ..
    cd express-server/ && npm install

In the root of the project, execute the following command:

    docker-compose -f docker-compose.yml up

This will download the necessary images, create the client and server containers, and will start the application. After the application was started, open your browser on http://localhost:4200/.

## Credits

- Tutorial: https://scotch.io/tutorials/create-a-mean-app-with-angular-2-and-docker-compose
