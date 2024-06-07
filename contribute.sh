#!/usr/bin/env bash

cd "$(dirname $0)"

cd data

FILE_PATH=$1
USER_NAME=$2
USER_EMAIL=$3

mkdir -p "$(dirname $FILE_PATH)"

# pipe stdin
cat > $FILE_PATH

# commit

git add $FILE_PATH

git commit \
  --only "$FILE_PATH" \
  --author "$USER_NAME <$USER_EMAIL>" \
  --message "$FILE_PATH"
