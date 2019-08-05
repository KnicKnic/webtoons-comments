var request = require('request');
var cheerio = require('cheerio');


var urls = []

var startUrl = "https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=1"

request(startUrl, function (err, resp, html) {
    if (!err) {
        let $ = cheerio.load(html);
        let items = $('[data-episode-no]')

        for (let i = 0; i != items.length; i++) {
            let item = items[i]
            if (item.attribs.href) {
                console.log(item.attribs.href)
                urls.push(item.attribs.href)
            }
        }
        // console.log(html);
    }
});

