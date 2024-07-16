FROM node:20-alpine AS development
WORKDIR /usr/src/app
COPY  package*.json ./
RUN npm ci -f
COPY  . .
CMD [ "npm", "run", "start:dev" ]

FROM node:20-alpine AS test
WORKDIR /usr/src/app
COPY  package*.json ./
RUN npm ci -f
COPY  . .
CMD [ "npm", "run", "start:dev" ]

FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY  package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm install -g @nestjs/cli
RUN npm run build
CMD [ "node", "dist/main.js" ]