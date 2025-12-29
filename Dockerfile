FROM --platform=linux/amd64 node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update && apt-get install -y openssl
RUN npm install -g pnpm@9.0.0
WORKDIR /app

# --- builder ---
FROM base AS builder
COPY . .
RUN npx turbo prune api --docker

# --- installer ---
FROM base AS installer
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/full/.npmrc ./.npmrc
RUN pnpm install --frozen-lockfile
COPY --from=builder /app/out/full/ .
WORKDIR /app/apps/api
RUN pnpm db:generate
RUN pnpm build

# --- runner (runtime stage) ---
FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
COPY --from=installer --chown=nestjs:nodejs /app /app
USER nestjs

WORKDIR /app/apps/api
# アプリケーションのポートを公開
EXPOSE 3000
CMD ["node", "dist/main.js"]