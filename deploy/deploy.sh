#!/bin/bash

# 애플리케이션 디렉토리로 이동
cd /path/to/your/project

# 최신 코드 가져오기
git pull

# 의존성 설치
npm ci

# 애플리케이션 빌드
npm run build

# PM2로 애플리케이션 재시작
pm2 reload ecosystem.config.js
