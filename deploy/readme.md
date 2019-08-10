# presteps

```bash
mkdir web
mkdir web/webtoons-rss
mkdir rss-webtoons-mongo
git clone https://github.com/KnicKnic/webtoons-comments.git
```

# Steps

```bash
# run the initial populate
docker-compose up -d 

# restart the populate for however many times it needs
docker-compose run rss-webtoons-gen

# when it is complete change the time on all posts for sorts
docker-compose run rss-webtoons-gen node updateTime.js
```



