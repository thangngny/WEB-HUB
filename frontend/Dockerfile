# GIAI ĐOẠN 1: 'builder' - Cài đặt dependencies và Build
FROM node:lts-alpine AS builder

# Cài đặt pnpm
RUN npm install -g pnpm

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package và cài đặt dependencies
# Dùng --frozen-lockfile để cài chính xác từ file lock
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy toàn bộ source code
COPY . .

# Build ứng dụng Next.js
RUN pnpm run build

# GIAI ĐOẠN 2: 'runner' - Chạy Production
FROM node:lts-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Cài đặt pnpm
RUN npm install -g pnpm

# Copy file package.json VÀ pnpm-lock.yaml
# DÒNG NÀY ĐÃ ĐƯỢC SỬA: Thêm pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Chỉ cài đặt dependencies cho production
# Quan trọng: giúp image cuối cùng siêu nhẹ
RUN pnpm install --prod --frozen-lockfile

# Copy app đã build từ giai đoạn 'builder'
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Cổng mặc định của Next.js là 3000
EXPOSE 3000

# Lệnh chạy production server của Next.js
CMD ["pnpm", "start"]
