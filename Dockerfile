FROM node:16-alpine

EXPOSE 8000
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
CMD yarn ts-node-dev app.ts