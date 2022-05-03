# pull official base image
FROM node:16

# set working directory
WORKDIR /app

# Set the application's environment variables

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --legacy-peer-deps --silent

# Copies everything over to Docker environment
COPY . ./

#Build for production
RUN npm run build

# Install 'serve' to run the application.


#Port used by the application
EXPOSE 3000
# Run application
CMD ["npm", "start"]