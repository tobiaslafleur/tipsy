# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

RUN mkdir -p images

COPY package.json ./
RUN yarn install

COPY . .

# Build app
RUN yarn build

EXPOSE 4000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD [ "node", "dist/main.js" ]