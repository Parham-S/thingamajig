FROM node:lts-alpine
ARG NODE_ENV=development
ENV NODE_ENV=development

WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "dev"]
