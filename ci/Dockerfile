ARG WORKDIR=/opt/app

FROM node:16.17-alpine3.15 AS base
RUN npm i -g pnpm

# Install dependencies only when needed
FROM base as dependencies
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Rebuild the source code only when needed
FROM base as builder
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY . .
COPY --from=dependencies ${WORKDIR}/node_modules node_modules
RUN pnpm build

# Production image, copy all the files and run next
FROM base as runner
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY --from=builder ${WORKDIR}/dist dist
COPY --from=builder ${WORKDIR}/package.json package.json

EXPOSE 3000
CMD ["pnpm", "start"]
