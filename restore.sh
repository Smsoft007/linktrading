#!/bin/bash

# 복구할 백업 ID 확인
if [ -z "$1" ]; then
  echo "사용법: ./restore.sh [백업ID]"
  echo "사용 가능한 백업 목록:"
  
  BACKUP_DIR="./project_backups"
  if [ -f "$BACKUP_DIR/backup_list.txt" ]; then
    cat "$BACKUP_DIR/backup_list.txt"
  else
    echo "백업 목록이 없습니다."
  fi
  
  exit 1
fi

TIMESTAMP=$1
BACKUP_DIR="./project_backups"
BACKUP_PATH="$BACKUP_DIR/backup_$TIMESTAMP"

# 백업 존재 여부 확인
if [ ! -d "$BACKUP_PATH" ]; then
  echo "오류: 백업 ID '$TIMESTAMP'를 찾을 수 없습니다."
  echo "사용 가능한 백업 목록:"
  
  if [ -f "$BACKUP_DIR/backup_list.txt" ]; then
    cat "$BACKUP_DIR/backup_list.txt"
  else
    echo "백업 목록이 없습니다."
  fi
  
  exit 1
fi

# 복구 전 현재 상태 백업 (안전장치)
echo "현재 상태를 임시 백업 중..."
TEMP_BACKUP="$BACKUP_DIR/temp_backup_before_restore"
mkdir -p "$TEMP_BACKUP"
cp -r ./src "$TEMP_BACKUP/" 2>/dev/null
cp package.json "$TEMP_BACKUP/" 2>/dev/null
cp package-lock.json "$TEMP_BACKUP/" 2>/dev/null
cp tailwind.config.js "$TEMP_BACKUP/" 2>/dev/null
cp next.config.js "$TEMP_BACKUP/" 2>/dev/null
cp next.config.ts "$TEMP_BACKUP/" 2>/dev/null

# 복구 확인
echo "경고: 이 작업은 현재 프로젝트 파일을 백업 '$TIMESTAMP'의 파일로 대체합니다."
echo "백업 정보:"
cat "$BACKUP_PATH/backup_info.txt"
echo ""
read -p "계속 진행하시겠습니까? (y/n): " confirm

if [ "$confirm" != "y" ]; then
  echo "복구가 취소되었습니다."
  exit 0
fi

# 소스 파일 복구
echo "소스 파일 복구 중..."
if [ -d "$BACKUP_PATH/src" ]; then
  rm -rf ./src
  mkdir -p ./src
  cp -r "$BACKUP_PATH/src/"* ./src/
else
  echo "경고: 백업에 src 디렉토리가 없습니다."
fi

# public 디렉토리 복구
if [ -d "$BACKUP_PATH/public" ]; then
  rm -rf ./public
  mkdir -p ./public
  cp -r "$BACKUP_PATH/public/"* ./public/ 2>/dev/null
fi

# 설정 파일 복구
echo "설정 파일 복구 중..."
if [ -d "$BACKUP_PATH/config" ]; then
  # 각 설정 파일 복구
  cp "$BACKUP_PATH/config/package.json" ./ 2>/dev/null
  cp "$BACKUP_PATH/config/package-lock.json" ./ 2>/dev/null
  cp "$BACKUP_PATH/config/yarn.lock" ./ 2>/dev/null
  cp "$BACKUP_PATH/config/tsconfig.json" ./ 2>/dev/null
  cp "$BACKUP_PATH/config/next.config.js" ./ 2>/dev/null
  cp "$BACKUP_PATH/config/next.config.ts" ./ 2>/dev/null
  cp "$BACKUP_PATH/config/tailwind.config.js" ./ 2>/dev/null
  cp "$BACKUP_PATH/config/postcss.config.js" ./ 2>/dev/null
  cp "$BACKUP_PATH/config/postcss.config.mjs" ./ 2>/dev/null
  cp "$BACKUP_PATH/config/.env" ./ 2>/dev/null
  cp "$BACKUP_PATH/config/.env.local" ./ 2>/dev/null
else
  echo "경고: 백업에 config 디렉토리가 없습니다."
fi

echo "복구가 완료되었습니다!"
echo "의존성 패키지를 다시 설치하려면 다음 명령어를 실행하세요:"
echo "npm install"
echo ""
echo "복구를 취소하고 이전 상태로 돌아가려면 다음 명령어를 실행하세요:"
echo "./undo_restore.sh" 