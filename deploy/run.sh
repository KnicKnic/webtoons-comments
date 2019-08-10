#!/bin/bash

# to install
# chmod u+x run.sh
# crontab -e
# 01 * * * * /home/croppy/webtoons-comments/deploy/runs.sh

cd /home/croppy

docker-compose run --rm rss-webtoons-gen

# generate rss
docker-compose run --rm rss-webtoons-gen node genRss.js
