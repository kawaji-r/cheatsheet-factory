# Stage 1: DevContainer
FROM node:22.14.0 AS develop

# 作業ディレクトリの設定
WORKDIR /workspace

# 必要なパッケージをインストール（例: build-essential 等）
COPY package.json package-lock.json ./
RUN npm ci
RUN npm install -g firebase-tools

