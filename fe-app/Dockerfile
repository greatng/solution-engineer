# /Dockerfile

## Stage 1 ##
# Use node 16 image as builder and alias it as builder
FROM node:16 as builder

# Define work directory inside docker container
WORKDIR /app
# Copy package.json and package-lock.json to work directory
COPY ./package*.json .
# install dependencies
RUN yarn install
# Copy app to work directory, this layers changes a lot so it is done last
COPY . .
RUN yarn build

## Stage 2
FROM node:16-alpine
WORKDIR /app
# Copy nextJS build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
# COPY --from=builder /app/.env.production.local ./

ENV NEXT_PUBLIC_BACKEND_URL=http://localhost:3100/webcheck

EXPOSE 80
CMD ["yarn", "start", "--port", "80"]
