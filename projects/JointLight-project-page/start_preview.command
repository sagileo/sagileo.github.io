#!/bin/zsh
cd -- "$(dirname -- "$0")" || exit 1
if command -v python3 >/dev/null 2>&1; then
  python3 preview.py
else
  echo "未找到 Python 3。请直接使用浏览器打开此目录中的 index.html。"
  read -r "?按回车结束。"
fi
