FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
COPY ./ssl /opt/ssl/
RUN npm install
COPY . .
EXPOSE 3002
EXPOSE 443
CMD ["npm", "start"]