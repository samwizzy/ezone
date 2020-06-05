# Build Environment
# FROM node:13.12.0-alpine as build
FROM node:14-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production

COPY package*.json ./
COPY internals ./
COPY yarn.lock ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . .
CMD [ "npm", "run", "build" ]

# Production Environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
