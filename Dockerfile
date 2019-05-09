
FROM node:8.16.0-alpine

COPY ./frontend /app
VOLUME /app
ENV npm_config_cache=npm-cache
RUN apk add --no-cache curl
RUN ls /app/app/dev