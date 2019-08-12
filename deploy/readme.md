# presteps

```bash
mkdir web
mkdir web/webtoons-rss
mkdir rss-webtoons-mongo
git clone https://github.com/KnicKnic/webtoons-comments.git
```

# Steps

Init the `comics` collection in database `rss-webtoons` with the following rows

```javascript
{_id: "117474", typePrefix: "c_", title: "I wish I were you", seriesNum: "117474", link: "https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474"}
{_id: "303991", typePrefix: "c_", title: "Draigon", seriesNum: "303991", link: "https://www.webtoons.com/en/challenge/draigon/list?title_no=303991"}
{_id: "212675", typePrefix: "c_", title: "Lamp-chan", seriesNum: "212675", link: "https://www.webtoons.com/en/challenge/lamp-chan/list?title_no=212675"}
```


```bash
# run the initial populate
docker-compose up -d 

# restart the populate for however many times it needs
docker-compose run --rm rss-webtoons-gen

# when it is complete change the time on all posts for sorts
docker-compose run --rm rss-webtoons-gen node updateTime.js

# generate rss
docker-compose run --rm rss-webtoons-gen node genRss.js
```

# Update steps

```bash
docker-compose build rss-webtoons-gen
```

