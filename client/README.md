# ReactJS Webapp - _Hattrick_
The webapp is based on [React + Redux - User Registration and Login Tutorial & Example](https://github.com/cornflourblue/react-redux-registration-login-example), adding to it the use of **_React-Router_**.

Given that as base code, a webapp has been built to allow users to register, login, reset their passwords, create communities, join communities, etc.. all of that making use of the [**Loopback REST API** developed for this.](https://github.com/daniegarcia254/Loopback-API-Hattrick)

## Configuration
The only configuration you need to be aware of needs to be specified in the [webpack config files](webpack) for every environment:
- _API_URL_: specifies the backend base API URL
- _NODE_ENV_: specifies the environment
- _SERVER_ROOT_: specifies the root path where the files will be accesible through the browser

## Development
In the [package.json](package.json) file you would find two different commands for start a development server that provides live reloading using [webpack-dev-server](https://github.com/webpack/webpack-dev-server).
The development servers are configured to be available at port 10009.
#### Local server
This case is only valid if you access the development server in _localhost_ from your browser.
```
npm run start-local
```
#### Development server
This case is very useful if you would like the development server to be accessible from the outside.
```
npm run start-dev
```
**_Note:_** In this case you will need to specify the URL from where the server will be accesible by modifying the _--public_ argument of the corresponding line the [package.json](package.json) file:
```
"start-dev": "webpack-dev-server --host 0.0.0.0 --port 10009 --public danigarcia-dev.com:10009 --config webpack/dev.config.js"
```

## Build
In the [package.json](package.json) file you would find a command for build the webapp using [webpack](https://github.com/webpack/webpack) bundler.
```
npm run build
```
This will buncle your webapp and save it to a _dist_ folder.

## Deploy
Reference to the [docker deploy on the root project.](https://github.com/daniegarcia254/Loopback-API-Hattrick/#deploy)

## Roadmap
- Adpat the use of React-Router to the Apache server
- Show the user some questions to answer and save the score of his responses to be reflected in the community table.
