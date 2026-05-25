# ====== 阶段一：构建前端 ======
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY MyBolgs/package*.json ./
RUN npm ci
COPY MyBolgs/ .
RUN npm run build-only

# ====== 阶段二：生产运行 ======
FROM node:20-alpine
WORKDIR /app

# 复制后端
COPY MyBolgsBackEnd/package*.json ./
RUN npm ci --production
COPY MyBolgsBackEnd/ .

# 从前一阶段拿前端构建产物
COPY --from=frontend-build /app/frontend/dist ./MyBolgs/dist

EXPOSE 5000
CMD ["node", "src/server.js"]
