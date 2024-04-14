# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) for dependencies installation
COPY package*.json ./

# Install any needed packages specified in package.json
# Will regenerate the node_modules folder.

RUN npm install

# Copy the rest of your application's code
COPY ./server.js ./server.js
COPY ./styles.css ./styles.css
COPY ./script.js ./script.js
COPY ./index.html ./index.html
#COPY . .

# Define environment variables
ENV PORT 3000
ENV SERVE_DIR /usr/src/app

# Run server.js when the container launches
CMD ["node", "server.js"]

