const fetch = require('node-fetch');
var cheerio = require('cheerio');


var urls = []

var startUrl = "https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=1"


const getData = async url => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);
      let items = $('[data-episode-no]')

      for (let i = 0; i != items.length; i++) {
          let item = items[i]
          if (item.attribs.href) {
              console.log(item.attribs.href)
              urls.push(item.attribs.href)
          }
      }
    //   console.log(html);
    } catch (error) {
      console.log(error);
    }
  };
  getData(startUrl);
