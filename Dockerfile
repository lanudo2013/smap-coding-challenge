
FROM node:8.16.0-alpine
USER jenkins
COPY ./frontend/app /app
RUN chown -R jenkins:jenkins /app
VOLUME /app
ENV npm_config_cache=npm-cache
RUN apk add --no-cache curl
RUN ls /app/dev
