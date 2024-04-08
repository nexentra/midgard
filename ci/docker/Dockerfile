# Stage 1: Build the static files
FROM node:21.6.2 AS frontend-builder
WORKDIR /client
COPY /client/package.json /client/yarn.lock ./
RUN yarn install
COPY /client .
COPY /client/.env.local /client/.env.local
RUN yarn build

# Stage 2: Build the binary
FROM golang:1.22 AS binary-builder
ARG APP_VERSION
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
COPY --from=frontend-builder /client/build ./client/build
COPY .env .
# RUN go run . db migrate && go run . db seed 
RUN go get -d -v \
&& CGO_ENABLED=1 GOOS=linux go build -o ./midgard -ldflags="-w -s -X main.VERSION=$APP_VERSION" .
EXPOSE 8081
EXPOSE 8080
EXPOSE 8079
CMD ["./midgard", "start"]