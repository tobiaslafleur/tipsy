# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

COPY package.json ./
RUN npm install

COPY . .

# Build app
RUN npm run build

EXPOSE 4001

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD [ "npm", "start" ]