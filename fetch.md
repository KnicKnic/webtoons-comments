first fetch


Invoke-WebRequest -Uri "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=jQuery17046051372282569436_1565219908478&lang=en&country=&objectId=c_117474_116&categoryId=&pageSize=15&indexSize=10&groupId=&listType=OBJECT&pageType=default&token=null&consumerKey=BiqLr39tq3iAWWxuiOXg&snsCode=null&page=1&initialize=true&userType=&useAltSort=true&replyPageSize=10&sort=new&_=1565219908535" -Headers @{"Sec-Fetch-Mode"="no-cors"; "Referer"="https://www.webtoons.com/en/challenge/i-wish-i-were-you/chapter-81/viewer?title_no=117474&episode_no=116"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"}

second fetch
Invoke-WebRequest -Uri "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=jQuery17046051372282569436_1565219908480&lang=en&country=&objectId=c_117474_116&categoryId=&pageSize=15&indexSize=10&groupId=&listType=OBJECT&pageType=default&token=null&consumerKey=BiqLr39tq3iAWWxuiOXg&snsCode=null&page=2&refresh=false&sort=NEW&_=1565220142103" -Headers @{"Sec-Fetch-Mode"="no-cors"; "Referer"="https://www.webtoons.com/en/challenge/i-wish-i-were-you/chapter-81/viewer?title_no=117474&episode_no=116"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"}

reply fetch

Invoke-WebRequest -Uri "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=jQuery17046051372282569436_1565219908479&lang=en&country=&objectId=c_117474_116&categoryId=&pageSize=10&indexSize=10&groupId=&listType=OBJECT&pageType=default&token=null&consumerKey=BiqLr39tq3iAWWxuiOXg&snsCode=null&parentCommentNo=91600052&page=1&userType=&_=1565219930232" -Headers @{"Sec-Fetch-Mode"="no-cors"; "Referer"="https://www.webtoons.com/en/challenge/i-wish-i-were-you/chapter-81/viewer?title_no=117474&episode_no=116"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"}




