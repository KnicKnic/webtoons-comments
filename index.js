const fetch = require('node-fetch');
var cheerio = require('cheerio');


var urls = []

var startUrl = "https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=1"

function* UrlGenerator(startUrl){
  let baseUrl = startUrl.substr(0,startUrl.length -1)
  for(let i=1; ; i++){
    yield (baseUrl + i)
  }
}

// Find urls
async function findComicUrls(url){
  let foundUrls = []
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  let items = $('[data-episode-no]')

  for (let i = 0; i != items.length; i++) {
      let item = items[i]
      if (item.attribs.href) {
          // console.log(item.attribs.href)
          foundUrls.push(item.attribs.href)
      }
  }
  return foundUrls;
};

const getUrls = async startUrl => {
  let s = new Set();
  let foundUrls = []
  var gen = UrlGenerator(startUrl)

  // 100 is just a break incase something crazy happens
  for(let i=0;i<100; ++i){ 
    var url = gen.next().value
    console.log(url)
    var addedAUrl = false
    let pageUrls = await findComicUrls(url)
    for(x of pageUrls){
      if(!s.has(x))
      {
        foundUrls.push(x)
        addedAUrl = true
        // console.log(x)
      }
      s.add(x)
    }
    if(!addedAUrl){
      console.log(JSON.stringify(foundUrls))
      break;
    }
  }

  };
  getUrls(startUrl);


// https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=1
// https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=2
// https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=3
// https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=4
// https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=5
// https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=6
// https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=7
// https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=8
// https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=9
// https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=10
// https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474&page=11
urls = ["https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=116","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=115","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=114","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=113","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=112","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=111","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=109","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=108","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=106","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=105","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=104","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=102","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=101","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=100","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=98","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=97","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=96","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=95","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=94","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=93","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=92","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=91","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=89","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=88","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=87","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=86","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=85","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=83","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=82","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=81","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=80","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=79","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=78","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=77","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=76","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=74","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=73","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=72","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=71","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=70","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=69","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=68","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=67","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=66","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=65","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=64","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=63","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=62","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=61","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=60","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=59","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=58","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=57","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=56","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=55","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=52","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=51","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=50","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=49","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=48","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=46","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=45","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=44","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=43","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=42","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=41","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=40","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=39","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=38","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=37","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=36","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=35","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=34","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=33","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=32","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=31","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=30","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=28","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=26","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=25","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=23","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=22","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=21","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=20","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=19","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=18","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=17","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=16","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=15","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=14","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=13","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=12","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=10","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=9","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=8","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=7","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=6","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=5","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=4","https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=1"]

