FROM loadimpact/k6:latest AS k6official
FROM node:15.12.0-alpine3.13
COPY --from=k6official /usr/bin/k6 /usr/bin/k6
RUN npm install -g webpack-cli
RUN npm install -g webpack
RUN apk update
RUN apk add --no-cache --virtual docker-cli python3 python3-dev libffi-dev openssl-dev gcc libc-dev make python3 py3-pip py-pip curl libffi-dev openssl-dev gcc libc-dev rust cargo make
RUN apk add docker
RUN pip install docker-compose
# install Docker Machine
RUN curl -L https://github.com/docker/machine/releases/download/v0.16.2/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine
RUN chmod +x /tmp/docker-machine
RUN cp /tmp/docker-machine /usr/local/bin/docker-machine
# I don't think that docker can be used without root access, so the following code has been removed
# RUN addgroup app && adduser -S -G app app
# RUN mkdir /app && chown app:app /app
# USER app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run compile
EXPOSE 3002
CMD [ "npm", "start" ]