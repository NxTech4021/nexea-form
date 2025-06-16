FROM node:20-alpine3.17

WORKDIR /app

COPY ./package*.json .

RUN yarn install

COPY . .

# USER node

# COPY --chown=node:node . .

EXPOSE 3000

CMD [ "yarn", "dev" ]