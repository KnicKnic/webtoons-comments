# Goal
generate RSS of webtoons comments and play with mongodb

# TODO

* get list of chapters in comic
* get list of comments in comic
    * I think I need to grab replies in comic
    * figure out if there are new replies and then grab them
* load results into database
* show results in database based on time processed
    * last 50 inserted into database
* periodically rescrape results
* create docker-compose for results


example URL

$a = Invoke-WebRequest -Uri "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=blab&lang=en&country=&objectId=w_1499_33&categoryId=&pageSize=30&indexSize=30&groupId=&listType=OBJECT&pageType=default&token=null&consumerKey=BasdOXg&snsCode=null&page=1&initialize=true&userType=&useAltSort=true&replyPageSize=30&sort=favorite&_=156493" -Headers @{"Referer"="https://www.webtoons.com/en/fantasy/castle-swimmer/episode-33/viewer?title_no=1499&episode_no=33"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"}
$a.content


```
$c = Invoke-WebRequest -Uri "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=a&lang=en&country=&objectId=c_117474_116&categoryId=&pageSize=30&indexSize=30&groupId=&listType=OBJECT&pageType=default&token=null&consumerKey=BasdOXg&snsCode=null&page=1&initialize=true&userType=&useAltSort=true&replyPageSize=30&sort=favorite&_=156493" -Headers @{"Referer"="https://www.webtoons.com"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"}

$c.content
```
note it is `objectId=c` for challenge and `objectId=w` for non challenge


To get list of episodes, need to scrape webpage.
What we do is `https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=12` start at page 1 and increase until no new comics are found.

need to find easy javascript html scraping library.