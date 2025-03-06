#!/bin/bash

# 타임스탬프 생성 (YYYYMMDD_HHMMSS 형식)
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# 백업 디렉토리 설정
BACKUP_DIR="./project_backups"
BACKUP_PATH="$BACKUP_DIR/backup_$TIMESTAMP"

# 백업 디렉토리 생성
mkdir -p "$BACKUP_PATH"
mkdir -p "$BACKUP_PATH/src"
mkdir -p "$BACKUP_PATH/public"
mkdir -p "$BACKUP_PATH/config"

# 주요 소스 파일 백업
echo "소스 파일 백업 중..."
cp -r ./src/* "$BACKUP_PATH/src/"
cp -r ./public/* "$BACKUP_PATH/public/" 2>/dev/null || echo "public 디렉토리가 없거나 비어 있습니다."

# 설정 파일 백업
echo "설정 파일 백업 중..."
cp package.json "$BACKUP_PATH/config/" 2>/dev/null || echo "package.json 파일이 없습니다."
cp package-lock.json "$BACKUP_PATH/config/" 2>/dev/null || echo "package-lock.json 파일이 없습니다."
cp yarn.lock "$BACKUP_PATH/config/" 2>/dev/null || echo "yarn.lock 파일이 없습니다."
cp tsconfig.json "$BACKUP_PATH/config/" 2>/dev/null || echo "tsconfig.json 파일이 없습니다."
cp next.config.js "$BACKUP_PATH/config/" 2>/dev/null || echo "next.config.js 파일이 없습니다."
cp next.config.ts "$BACKUP_PATH/config/" 2>/dev/null || echo "next.config.ts 파일이 없습니다."
cp tailwind.config.js "$BACKUP_PATH/config/" 2>/dev/null || echo "tailwind.config.js 파일이 없습니다."
cp postcss.config.js "$BACKUP_PATH/config/" 2>/dev/null || echo "postcss.config.js 파일이 없습니다."
cp postcss.config.mjs "$BACKUP_PATH/config/" 2>/dev/null || echo "postcss.config.mjs 파일이 없습니다."
cp .env "$BACKUP_PATH/config/" 2>/dev/null || echo ".env 파일이 없습니다."
cp .env.local "$BACKUP_PATH/config/" 2>/dev/null || echo ".env.local 파일이 없습니다."

# 백업 정보 저장
echo "백업 정보 저장 중..."
echo "백업 생성 시간: $(date)" > "$BACKUP_PATH/backup_info.txt"
echo "프로젝트: $(basename $(pwd))" >> "$BACKUP_PATH/backup_info.txt"
echo "백업 ID: $TIMESTAMP" >> "$BACKUP_PATH/backup_info.txt"

# 백업 목록 파일 업데이트
echo "$TIMESTAMP" >> "$BACKUP_DIR/backup_list.txt"

echo "백업이 완료되었습니다!"
echo "백업 ID: $TIMESTAMP"
echo "백업 위치: $BACKUP_PATH"
echo "복구가 필요할 때 다음 명령어를 사용하세요: ./restore.sh $TIMESTAMP" 