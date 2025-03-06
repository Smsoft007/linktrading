#!/bin/bash

# 타임스탬프 생성 (YYYYMMDD_HHMMSS 형식)
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Git 저장소 확인
if [ ! -d ".git" ]; then
  echo "Git 저장소가 없습니다. Git 저장소를 초기화합니다."
  git init
  
  # .gitignore 파일이 없으면 생성
  if [ ! -f ".gitignore" ]; then
    echo "기본 .gitignore 파일을 생성합니다."
    cat > .gitignore << EOL
# 의존성
/node_modules
/.pnp
.pnp.js

# 테스트
/coverage

# 빌드 결과물
/.next/
/out/
/build
/dist

# 환경 변수
.env*.local
.env

# 로그
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 백업 디렉토리
/project_backups/

# 기타
.DS_Store
*.pem
EOL
  fi
fi

# 현재 브랜치 확인
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
if [ $? -ne 0 ]; then
  # 초기 커밋이 없는 경우
  echo "초기 커밋을 생성합니다."
  git add .
  git commit -m "Initial commit"
  CURRENT_BRANCH="main"
  git branch -M main
fi

# 백업 브랜치 생성
BACKUP_BRANCH="backup/$TIMESTAMP"
echo "백업 브랜치 '$BACKUP_BRANCH' 생성 중..."
git checkout -b "$BACKUP_BRANCH"

# 변경 사항 확인
if git diff-index --quiet HEAD --; then
  # 변경 사항이 없는 경우
  echo "변경 사항이 없습니다. 현재 상태를 백업합니다."
else
  # 변경 사항이 있는 경우
  echo "변경 사항을 커밋합니다."
  git add .
  git commit -m "Backup: $TIMESTAMP"
fi

# 백업 태그 생성
BACKUP_TAG="backup-$TIMESTAMP"
echo "백업 태그 '$BACKUP_TAG' 생성 중..."
git tag -a "$BACKUP_TAG" -m "Backup at $(date)"

# 원래 브랜치로 돌아가기
echo "원래 브랜치 '$CURRENT_BRANCH'로 돌아갑니다."
git checkout "$CURRENT_BRANCH"

# 백업 정보 저장
BACKUP_DIR="./project_backups"
mkdir -p "$BACKUP_DIR"
echo "$TIMESTAMP|$BACKUP_BRANCH|$BACKUP_TAG" >> "$BACKUP_DIR/git_backup_list.txt"

echo "Git 백업이 완료되었습니다!"
echo "백업 ID: $TIMESTAMP"
echo "백업 브랜치: $BACKUP_BRANCH"
echo "백업 태그: $BACKUP_TAG"
echo "복구가 필요할 때 다음 명령어를 사용하세요: ./git_restore.sh $TIMESTAMP" 