FROM node:lts-alpine as builder

ADD / /app
WORKDIR /app

RUN yarn install
RUN yarn run build
RUN ls -l /app/dist/

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/ .