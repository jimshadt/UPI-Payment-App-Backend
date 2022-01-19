FROM node:10.15.1

RUN useradd --user-group --create-home --shell /bin/false app
ENV HOME=/home/app
ENV APP_DIR=mapps-server

RUN npm install -g yarn
COPY tsconfig.json package.json $HOME/$APP_DIR/

RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/$APP_DIR

USER root





RUN rm -rf $HOME/$APP_DIR/**/*.marko.js




WORKDIR $HOME/$APP_DIR
COPY ./ $HOME/$APP_DIR
RUN chown -R app:app $HOME/*
RUN yarn install --production

ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

USER app

# CMD ["node", "src/app.js"]