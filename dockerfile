FROM node:18-alpine AS base

RUN npm install pnpm -g

FROM base AS tsbuilder

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM base AS builder

WORKDIR /usr/src/app

COPY --from=tsbuilder /usr/src/app/dist ./dist
COPY package*.json ./

RUN pnpm install --production

RUN pnpm add @vercel/ncc

RUN ncc build ./dist/index.js -o -m prod

FROM base AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/prod/ ./prod

EXPOSE 3001

CMD [ "node", "prod/index.js" ]