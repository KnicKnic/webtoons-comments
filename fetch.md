first fetch


Invoke-WebRequest -Uri "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=jQuery17046051372282569436_1565219908478&lang=en&country=&objectId=c_117474_116&categoryId=&pageSize=15&indexSize=10&groupId=&listType=OBJECT&pageType=default&token=null&consumerKey=BiqLr39tq3iAWWxuiOXg&snsCode=null&page=1&initialize=true&userType=&useAltSort=true&replyPageSize=10&sort=new&_=1565219908535" -Headers @{"Sec-Fetch-Mode"="no-cors"; "Referer"="https://www.webtoons.com/en/challenge/i-wish-i-were-you/chapter-81/viewer?title_no=117474&episode_no=116"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"}

second fetch
Invoke-WebRequest -Uri "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=jQuery17046051372282569436_1565219908480&lang=en&country=&objectId=c_117474_116&categoryId=&pageSize=15&indexSize=10&groupId=&listType=OBJECT&pageType=default&token=null&consumerKey=BiqLr39tq3iAWWxuiOXg&snsCode=null&page=2&refresh=false&sort=NEW&_=1565220142103" -Headers @{"Sec-Fetch-Mode"="no-cors"; "Referer"="https://www.webtoons.com/en/challenge/i-wish-i-were-you/chapter-81/viewer?title_no=117474&episode_no=116"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"}

reply fetch

Invoke-WebRequest -Uri "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=jQuery17046051372282569436_1565219908479&lang=en&country=&objectId=c_117474_116&categoryId=&pageSize=10&indexSize=10&groupId=&listType=OBJECT&pageType=default&token=null&consumerKey=BiqLr39tq3iAWWxuiOXg&snsCode=null&parentCommentNo=91600052&page=1&userType=&_=1565219930232" -Headers @{"Sec-Fetch-Mode"="no-cors"; "Referer"="https://www.webtoons.com/en/challenge/i-wish-i-were-you/chapter-81/viewer?title_no=117474&episode_no=116"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"}





multiple reply fetch
first page
Invoke-WebRequest -Uri "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=jQuery17045915984378381003_1565248051223&lang=en&country=&objectId=w_958_332&categoryId=&pageSize=10&indexSize=10&groupId=&listType=OBJECT&pageType=default&token=fv4SV1CU8B4y8GxpBl305IMD9Xw1U90MU1tfDWaZ%2BBxVJYTHSv3e7xXBWOnMRmYTlrgLUDjXYZS6gH2vGrH9NVgVTxX6yo8GVoUHSSZBE384CqpP1m4u5GytZUltFvrqS5sXaCH5Ue67WB7amuUZtrYmST9bmgkJtjUsabEw7dpW%2BdU8IZTGRxYzv377ByuEcZsbyi2LaRy9Rp7KJUhZ67os5M90RT%2B4Ux6G1SIZRIJdV9UzGaHRgR%2BuTXsrGWga9f1BOyXRZtaLfNHaMNLKOgOTDE1BZ1GWn1qcOFL9%2BUx1oaWWM3vS71wxUxkFLm9NoiHQFu0WnFfo78bngIq%2BeynLk9iUiUJ3PLssme2wLy%2FE8qJNOwprJ85gtnkf2Q4WBJ%2FU93%2B3KzWX1pOIHvgczA%3D%3D&consumerKey=BiqLr39tq3iAWWxuiOXg&snsCode=email&parentCommentNo=91232066&page=1&userType=&_=1565248063635" -Headers @{"Sec-Fetch-Mode"="no-cors"; "Referer"="https://www.webtoons.com/en/slice-of-life/my-giant-nerd-boyfriend/332-laughter/viewer?title_no=958&episode_no=332"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"}


second page
Invoke-WebRequest -Uri "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=jQuery17045915984378381003_1565248051224&lang=en&country=&objectId=w_958_332&categoryId=&pageSize=10&indexSize=10&groupId=&listType=OBJECT&pageType=default&token=fv4SV1CU8B4y8GxpBl305IMD9Xw1U90MU1tfDWaZ%2BBxVJYTHSv3e7xXBWOnMRmYTlrgLUDjXYZS6gH2vGrH9NVgVTxX6yo8GVoUHSSZBE384CqpP1m4u5GytZUltFvrqS5sXaCH5Ue67WB7amuUZtrYmST9bmgkJtjUsabEw7dpW%2BdU8IZTGRxYzv377ByuEcZsbyi2LaRy9Rp7KJUhZ67os5M90RT%2B4Ux6G1SIZRIJdV9UzGaHRgR%2BuTXsrGWga9f1BOyXRZtaLfNHaMNLKOgOTDE1BZ1GWn1qcOFL9%2BUx1oaWWM3vS71wxUxkFLm9NoiHQFu0WnFfo78bngIq%2BeynLk9iUiUJ3PLssme2wLy%2FE8qJNOwprJ85gtnkf2Q4WBJ%2FU93%2B3KzWX1pOIHvgczA%3D%3D&consumerKey=BiqLr39tq3iAWWxuiOXg&snsCode=email&parentCommentNo=91232066&page=2&userType=&_=1565248075424" -Headers @{"Sec-Fetch-Mode"="no-cors"; "Referer"="https://www.webtoons.com/en/slice-of-life/my-giant-nerd-boyfriend/332-laughter/viewer?title_no=958&episode_no=332"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"}




