# Goal

Generate an RSS feed of the comments for a webtoons comic. 

### Sub-Goal

I also wanted to play with mongodb and learn a little about it.

## Status

It works! See example https://rss.croppy.duckdns.org/117474-rss.xml

## Deploy instructions

see [deploy/readme.md](deploy/readme.md)

## ~~TODO~~

Completed items

* get list of chapters in comic
* get list of comments in comic
    * I think I need to grab replies in comic
    * figure out if there are new replies and then grab them
* load results into database
* show results in database based on time processed
    * last 50 inserted into database
* grab Image for page & put url into db
* generate list with images
* generate content that includes replied post in results
* periodically rescrape results
* create docker-compose for results


## Some notes

see [scraping_notes.md](scraping_notes.md) and [fetch.md](fetch.md)

