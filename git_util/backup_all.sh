#!/bin/bash

# 타임스탬프 생성 (YYYYMMDD_HHMMSS 형식)
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
echo "통합 백업을 시작합니다. 백업 ID: $TIMESTAMP"

# 백업 디렉토리 설정
BACKUP_DIR="./project_backups"
mkdir -p "$BACKUP_DIR"

# 백업 정보 저장
echo "백업 정보 저장 중..."
echo "백업 생성 시간: $(date)" > "$BACKUP_DIR/backup_$TIMESTAMP.info"
echo "프로젝트: $(basename $(pwd))" >> "$BACKUP_DIR/backup_$TIMESTAMP.info"
echo "백업 ID: $TIMESTAMP" >> "$BACKUP_DIR/backup_$TIMESTAMP.info"

# 1. 파일 시스템 백업 실행
echo "파일 시스템 백업 실행 중..."
./backup.sh "$TIMESTAMP"
FS_BACKUP_STATUS=$?

if [ $FS_BACKUP_STATUS -ne 0 ]; then
  echo "파일 시스템 백업에 실패했습니다."
  exit 1
fi

# 2. Git 백업 실행
echo "Git 백업 실행 중..."
./git_backup.sh "$TIMESTAMP"
GIT_BACKUP_STATUS=$?

if [ $GIT_BACKUP_STATUS -ne 0 ]; then
  echo "Git 백업에 실패했습니다."
  # Git 백업 실패는 치명적이지 않으므로 계속 진행
  echo "경고: Git 백업이 실패했지만 파일 시스템 백업은 성공했습니다."
fi

# 백업 목록 파일 업데이트
echo "$TIMESTAMP|$(date)|$(whoami)|$(pwd)" >> "$BACKUP_DIR/all_backups.txt"

echo "통합 백업이 완료되었습니다!"
echo "백업 ID: $TIMESTAMP"
echo "복구가 필요할 때 다음 명령어를 사용하세요:"
echo "파일 시스템 복구: ./restore.sh $TIMESTAMP"
echo "Git 복구: ./git_restore.sh $TIMESTAMP" 