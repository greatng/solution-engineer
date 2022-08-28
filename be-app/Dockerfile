# Build stage

FROM golang:1.18-alpine as build

WORKDIR /cmd/backend

COPY ./cmd/backend/ .

#CGO_ENABLED=0 => Need static lib as a result
RUN CGO_ENABLED=0 go build -o backend .

# Deploy stage

FROM gcr.io/distroless/base-debian10

WORKDIR /

COPY --from=build ./cmd/backend/backend .

EXPOSE 3100

USER nonroot:nonroot

CMD ["./backend"]
