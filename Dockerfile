# ====== 阶段一：构建前端 ======
FROM node:20-alpine AS frontend-build
WORKDIR /build

# 仓库里没有 package-lock.json，因此用 npm install 而不是 npm ci
COPY MyBolgs/package.json ./
RUN npm install --no-audit --no-fund

COPY MyBolgs/index.html MyBolgs/vite.config.ts MyBolgs/env.d.ts ./
COPY MyBolgs/tsconfig.json MyBolgs/tsconfig.app.json MyBolgs/tsconfig.node.json ./
COPY MyBolgs/src ./src
COPY MyBolgs/public ./public
RUN npm run build-only

# ====== 阶段二：生产运行 ======
FROM node:20-alpine
# 注意：必须保持 app/MyBolgsBackEnd + app/MyBolgs 的同级结构，
# 因为 server.js 用 __dirname + '../../MyBolgs/dist' 定位前端产物。
WORKDIR /app/MyBolgsBackEnd

COPY MyBolgsBackEnd/package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY MyBolgsBackEnd/src ./src

COPY --from=frontend-build /build/dist /app/MyBolgs/dist
COPY MyBolgs/public /app/MyBolgs/public
COPY MyBolgs/src/assets /app/MyBolgs/src/assets

# 只带上运行时真正用到的两个 Live2D 模型（其余 670MB+ 不再进镜像）
COPY MyBolgs/model/dafeng_2 /app/MyBolgs/model/dafeng_2
COPY MyBolgs/model/xianghe_2 /app/MyBolgs/model/xianghe_2

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "src/server.js"]
