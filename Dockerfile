FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g ./

# Bundle app source
COPY . .

## Create system user, no pass, no shell, no home dir
RUN adduser --system --no-create-home --group app
RUN chown -R app /usr/src/app
USER app

CMD [ "npm", "start" ]