set -eu

npm run build

current_date_time=$(date "+%Y/%m/%d %H:%M")
git add .
git commit -m "$current_date_time"
git push origin main

gsutil -m cp -r build/* gs://jk.rue1.net/
