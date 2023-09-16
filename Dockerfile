## https://hub.docker.com/_/node
FROM node:20.5-alpine3.17@sha256:c8ae1785da54b802347d06e826d5ae127fc7851114803ee4098f782d46ba40a9
USER node
WORKDIR /home/node/proof-visualization
ARG NODE_ENV=production

COPY --chown=node:node package.json package-lock.json ./
RUN npm install --only=production --loglevel verbose

COPY --chown=node:node app/ app/
COPY --chown=node:node util/ util/
COPY --chown=node:node .eslintrc.json jsconfig.json next.config.js ./
RUN npm run build

## ToDo: Check if these files are still needed
# COPY --chown=node:node public/ public/
# COPY --chown=node:node sbgnStyle/ sbgnStyle/

## adding init, to handle signals
## docs: https://engineeringblog.yelp.com/2016/01/dumb-init-an-init-for-docker.html
## ToDo: Add code to app, to handle SIGTERM and remove this script below
RUN wget -O /home/node/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.5/dumb-init_1.2.5_x86_64
RUN chmod +x /home/node/dumb-init

EXPOSE 3000
CMD [ "/home/node/dumb-init", "npm", "run", "start", "--verbose" ]