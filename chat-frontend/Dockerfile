# forma 1 usando http-server
# FROM node:20 as build
# RUN npm install -g http-server
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install -g ionic
# RUN npm install --force
# COPY . .
# es necesario probar el CMD npm run build por que si contiene errores el codigo no va a construir el contenedors
# RUN npm run build
# EXPOSE 8000
# CMD [ "http-server", "dist" ]

# forma 1 usando nginx
FROM node:20 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g ionic
RUN npm install --force
COPY . .
# es necesario probar el CMD npm run build por que si contiene errores el codigo no va a construir el contenedor
# RUN npm run build
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]