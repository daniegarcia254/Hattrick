#!/bin/bash

# Script used to start the REST API

pm2 start start.config.json --only hattrick --env dev  --no-daemon
#pm2 restart start.config.json --update-env
