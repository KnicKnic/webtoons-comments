#!/bin/bash
PATH=/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/bin:$PATH


# to install
# chmod u+x run.sh
# crontab -e
# 56 * * * * /home/croppy/webtoons-comments/deploy/run.sh 2>&1  > /home/croppy/webtoons-comments/deploy/log.txt

cd /home/croppy

docker-compose run --rm rss-webtoons-gen

# generate rss
docker-compose run --rm rss-webtoons-gen node genRss.js
