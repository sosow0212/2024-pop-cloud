# Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app

# ARG로 빌드 시 환경변수를 받음
ARG NEXT_PUBLIC_API_MOCKING
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_KAKAOMAP_KEY

# 받은 ARG를 환경변수로 설정
ENV NEXT_PUBLIC_API_MOCKING=$NEXT_PUBLIC_API_MOCKING
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_KAKAOMAP_KEY=$NEXT_PUBLIC_KAKAOMAP_KEY

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 런타임 환경변수도 ARG에서 가져옴
ARG NEXT_PUBLIC_API_MOCKING
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_KAKAOMAP_KEY

ENV NEXT_PUBLIC_API_MOCKING=$NEXT_PUBLIC_API_MOCKING
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_KAKAOMAP_KEY=$NEXT_PUBLIC_KAKAOMAP_KEY

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]