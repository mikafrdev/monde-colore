# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN npm install -g npm@latest && npm install -g pnpm@10.15.0

# ---- Dépendances ----
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Build ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_SITE
ARG DATABASE_URL
ARG DIRECT_URL
ARG BETTER_AUTH_SECRET
ARG BETTER_AUTH_URL

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_SITE=$NEXT_PUBLIC_SITE
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL
ENV BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET
ENV BETTER_AUTH_URL=$BETTER_AUTH_URL

RUN npx prisma generate
RUN npm run build

# ---- Production ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Client Prisma généré (chemin custom)
COPY --from=builder --chown=nextjs:nodejs /app/src/lib/prisma/generated ./src/lib/prisma/generated

USER nextjs
EXPOSE 3016
ENV PORT=3016
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]