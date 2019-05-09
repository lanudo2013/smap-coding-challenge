
FROM node:8.16.0-alpine
COPY ./frontend/app /app
RUN chmod 777 -R  /app 
VOLUME /app
ENV npm_config_cache=npm-cache
RUN apk add --no-cache curl
RUN ls /app/dev
