# Use the official Node.js image
FROM node:14

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Cài đặt axios
RUN npm install axios
RUN npm install bcrypt
RUN npm install express-session
RUN npm install nodemailer


# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]
