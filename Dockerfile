FROM gcr.io/distroless/base-debian12:debug-nonroot

WORKDIR /app
EXPOSE 3030 3030
COPY docker/distroless_group /etc/group
COPY docker/distroless_passwd /etc/passwd
USER ubuntu

ENTRYPOINT ["/app/wallet", "serve"]