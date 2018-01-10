FROM dgarcia254/ubuntu-node-pm2:latest

LABEL maintaner "Daniel Garcia - daniegarcia254@gmail.com"

#Set the backend work directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Add our package.json and install *before* adding our backend app files
ADD package.json ./
RUN npm install

#Copy rest of the backend files and config env
COPY ./ /usr/src/app/

#Start service
CMD ["/bin/bash","start.sh"]
