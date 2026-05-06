FROM node:25.9-alpine3.23 AS base

RUN npm i -g pnpm

WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN pnpm i
COPY . .

ENV NODE_ENV=development
ENV NEXT_NODE_ENV=development
ENV NEXT_PUBLIC_NODE_ENV=development

CMD [ "pnpm" , "run", "dev" ]