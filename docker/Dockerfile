FROM node:23.11.0-alpine3.20

# 作業ディレクトリの設定
WORKDIR /workspace

# 必要なパッケージをインストール（例: build-essential 等）
COPY package.json package-lock.json ./
RUN npm ci
