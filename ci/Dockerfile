ARG WORKDIR=/opt/app

# Base Stage: Upgrade npm and install / upgrade pnpm
FROM node:18-alpine AS base
LABEL builder=true
RUN npm i -g npm pnpm

# Dependencies Stage: Copy package.json + lock file and install dependencies
FROM base as dependencies
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY package.json pnpm-lock.yaml ./
# Skip pnpm checking + Husky init
RUN pnpm install --ignore-scripts

# Builder Stage: Copy node_modules from dependencies and build it
FROM base as builder
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY . .
COPY --from=dependencies ${WORKDIR}/node_modules node_modules
RUN pnpm build

# Production Stage: Copy dist and package.json from builder and start the application
FROM base as runner
ARG WORKDIR
WORKDIR ${WORKDIR}
COPY --from=builder ${WORKDIR}/dist dist
COPY --from=builder ${WORKDIR}/package.json package.json

EXPOSE 3000
CMD ["pnpm", "start"]
