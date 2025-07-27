FROM rust:1.88 AS builder

WORKDIR /usr/src/rust-blog
RUN apt-get update && apt-get install -y\
  libc6 libc6-dev libssl-dev libpq5 libpq-dev pkg-config build-essential

COPY ./rust-blog/Cargo.toml ./rust-blog/Cargo.lock ./
COPY ./rust-blog/diesel.toml .
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release

COPY ./rust-blog/ .
RUN cargo build --release

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y\
  libpq5 ca-certificates && \
  apt-get clean

COPY ./rust-blog/templates /usr/src/rust-blog/templates/
COPY --from=builder /usr/src/rust-blog/target/release/rust-blog /usr/local/bin/rust-blog
EXPOSE 8080
CMD ["rust-blog"]
