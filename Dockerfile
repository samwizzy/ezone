# FROM containership/alpine-node-yarn
FROM kewaii/alpine-node-npminstall
# FROM node:10-alpine

COPY internals/scripts ezone/internals/scripts
COPY package.json ezone/package.json
# COPY yarn.lock ezone/yarn.lock
COPY build ezone/build
COPY server ezone/server

WORKDIR /home/ezone

ENV NODE_ENV production

RUN npm install --production
# RUN yarn install --production

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:prod"]
# ENTRYPOINT ["yarn", "run", "start:prod"]
