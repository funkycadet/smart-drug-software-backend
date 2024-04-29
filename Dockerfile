FROM node:18-alpine

WORKDIR /smart-drug-software

COPY tsconfig*.json ./

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENTRYPOINT ["/smart-drug-software/entrypoint.sh"]
