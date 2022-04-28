FROM node:12.22.12-alpine as node

WORKDIR /app

COPY . .

RUN npm install ionic
RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=node /app/www/ /usr/share/nginx/html/
