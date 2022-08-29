# Build stage

FROM golang:1.18-alpine as build

WORKDIR /app

COPY . .

#CGO_ENABLED=0 => Need static lib as a result
RUN CGO_ENABLED=0 go build -o webchecker ./cmd/webchecker

# Deploy stage

FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build ./app .

EXPOSE 3100

USER nonroot:nonroot

CMD ["./webchecker"]
