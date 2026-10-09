FROM node:26-alpine
WORKDIR /app
LABEL org.opencontainers.image.title="InvisiProxy LTS" \
      org.opencontainers.image.description="An effective, privacy-focused web proxy service" \
      org.opencontainers.image.version="8.1.0" \
      org.opencontainers.image.authors="InvisiProxy Team" \
      org.opencontainers.image.source="https://github.com/IkerAlvaro/InvisiProxyLTS"

# System deps (Tor optional for free-tier hosts)
RUN apk add --no-cache tor bash python3 py3-pip make g++ gcc libc-dev gcompat

# Enable pnpm via corepack
RUN npm install -g corepack && corepack enable && corepack prepare pnpm@latest --activate

# Copy package files first for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm run fresh-install

# Copy the rest of the source
COPY . .

# Build the app
RUN pnpm run build

EXPOSE 8080 9050 9051

COPY serve.sh /serve.sh
RUN chmod +x /serve.sh

CMD ["/serve.sh"]
