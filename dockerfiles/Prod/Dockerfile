FROM node:16-alpine AS build
WORKDIR /app

COPY package*.json /app/
COPY yarn.lock /app/
COPY tsconfig.json /app/
COPY .sequelizerc /app/
RUN apk add --no-cache git
RUN yarn

COPY src /app/src/
COPY start.sh /app/

RUN yarn build-ts

FROM node:16-alpine
WORKDIR /app
COPY --from=build /app /app
RUN chmod +x ./start.sh
CMD ./start.sh
