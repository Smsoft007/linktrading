#!/bin/bash

BACKUP_DIR="./project_backups"
TEMP_BACKUP="$BACKUP_DIR/temp_backup_before_restore"

# 임시 백업 존재 여부 확인
if [ ! -d "$TEMP_BACKUP" ]; then
  echo "오류: 임시 백업을 찾을 수 없습니다. 복구 취소가 불가능합니다."
  exit 1
fi

# 복구 취소 확인
echo "경고: 이 작업은 방금 복구한 파일들을 복구 이전 상태로 되돌립니다."
read -p "계속 진행하시겠습니까? (y/n): " confirm

if [ "$confirm" != "y" ]; then
  echo "복구 취소가 중단되었습니다."
  exit 0
fi

# 소스 파일 복원
echo "소스 파일 복원 중..."
if [ -d "$TEMP_BACKUP/src" ]; then
  rm -rf ./src
  mkdir -p ./src
  cp -r "$TEMP_BACKUP/src/"* ./src/
fi

# 설정 파일 복원
echo "설정 파일 복원 중..."
cp "$TEMP_BACKUP/package.json" ./ 2>/dev/null
cp "$TEMP_BACKUP/package-lock.json" ./ 2>/dev/null
cp "$TEMP_BACKUP/tailwind.config.js" ./ 2>/dev/null
cp "$TEMP_BACKUP/next.config.js" ./ 2>/dev/null
cp "$TEMP_BACKUP/next.config.ts" ./ 2>/dev/null

echo "복구 취소가 완료되었습니다!"
echo "의존성 패키지를 다시 설치하려면 다음 명령어를 실행하세요:"
echo "npm install"

# 임시 백업 삭제 여부 확인
read -p "임시 백업을 삭제하시겠습니까? (y/n): " delete_confirm

if [ "$delete_confirm" = "y" ]; then
  rm -rf "$TEMP_BACKUP"
  echo "임시 백업이 삭제되었습니다."
else
  echo "임시 백업이 '$TEMP_BACKUP'에 보존되었습니다."
fi 