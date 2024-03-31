# Stage 1: Build the static files
FROM node:21.6.2 AS frontend-builder
WORKDIR /client
COPY /client/package.json /client/yarn.lock ./
RUN yarn install
COPY /client .
RUN yarn export

# Stage 2: Build the binary
FROM golang:1.22 AS binary-builder
WORKDIR /builder
COPY go.mod go.sum ./
RUN go mod download
COPY . .
COPY --from=frontend-builder /client/build ./client/build
RUN CGO_ENABLED=0 go build -ldflags "-w" -a -buildvcs=false -o main ./main.go

# Stage 3: Run the binary
FROM gcr.io/distroless/static
EXPOSE 8080
EXPOSE 8081
EXPOSE 3000
WORKDIR /app
COPY --from=binary-builder --chown=nonroot:nonroot /builder/main .
COPY .env .env
ENTRYPOINT ["./main"]