const fetch = require('node-fetch');
const utf8 = require('utf8');
var cheerio = require('cheerio');
const fs = require('fs').promises;
var os = require('os');
const axios = require('axios').default;
// const uuidv4 = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');


var endpoint = "https://api.cognitive.microsofttranslator.com";
var sourceLanguage = "en"
var subcriptionKey = ""



var urls = []

// Connection URL

let mongoUrl = 'mongodb://rss-webtoons:27017';
let dbName = 'rss-webtoons';
let feedLocation = "/feed/"
if(os.platform() == "win32"){
  mongoUrl = 'mongodb://localhost:27017';
  dbName = 'testProject';
  feedLocation = "c:\\tmp\\"
}

function* UrlGenerator(startUrl){
  let baseUrl = startUrl.substr(0,startUrl.length -1)
  for(let i=1; ; i++){
    yield (baseUrl + i)
  }
}

// Find urls
async function findComicUrls(url){
  let foundUrls = []
  let tUrl = encodeURI(url) //utf8.encode(url)
  const response = await fetch(tUrl);
  const html = await response.text();
  const $ = cheerio.load(html);
  let items = $('li[data-episode-no]')
  // type tag, name li

// NODE.childNodes[1].attribs.href url
// Node.childNodes[1].childNodes[1].childNodes[1].href picUrl
// Node.childNodes[1].childNodes[1].childNodes[1].alt chapterName
  for (let i = 0; i != items.length; i++) {
      let item = items[i]
      // if (item.attribs.href) {
      //     // console.log(item.attribs.href)
      //     foundUrls.push(item.attribs.href)
      // }
      let comicUrl = item.childNodes[3].childNodes[1].attribs.href
      let link = item.childNodes[1].attribs.href
      let picUrl = item.childNodes[1].childNodes[1].childNodes[1].attribs.src
      let chapterName = item.childNodes[1].childNodes[1].childNodes[1].attribs.alt
      foundUrls.push({url: comicUrl, pic: picUrl, title: chapterName, link: link})
  }
  return foundUrls;
};

async function* getUrls(startUrl) {
  let s = new Set();
  let foundUrls = []
  var gen = UrlGenerator(startUrl)

  // 100 is just a break incase something crazy happens
  for(let i=0;i<100; ++i){ 
    var url = gen.next().value
    console.log(url)
    var addedAUrl = false
    let pageUrls = await findComicUrls(url)
    for(let page of pageUrls){
      let x = page.url
      if(!s.has(x))
      {
        yield page
        addedAUrl = true
        // console.log(x)
      }
      s.add(x)
    }
    if(!addedAUrl){
      return;
    }
  }

  };
  // getUrls(startUrl);

function parseTitleEpisode(url){

  var parsed = new URL(url)
  return {title: parsed.searchParams.get('titleNo'),
          episode: parsed.searchParams.get('episodeNo'), }
}

function makeCommentUrl(url){
  
  const {title, episode} = parseTitleEpisode(url)
  return "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=a&lang=en&country=&objectId=c_"  + title + '_' + episode +'&categoryId=&pageSize=30&indexSize=30&groupId=&listType=OBJECT&pageType=default&token=null&consumerKey=BasdOXg&snsCode=null&page=1&initialize=true&userType=&useAltSort=true&replyPageSize=30&sort=favorite&_=156493'
}

// generate replyUrls
// keep going until .result.pageModel.nextPage == 0
function MakeGenerateCommentReplyUrls(commentNo){
  return function*(episodeUrl) {
  const {title, episode} = parseTitleEpisode(episodeUrl)
  let commentUrl = new URL("https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=a&lang=en&country=&objectId=c_"  + title + '_' + episode +'&categoryId=&parentCommentNo='+commentNo + '&pageSize=30&indexSize=30&groupId=&listType=OBJECT&pageType=default&token=null&consumerKey=BasdOXg&snsCode=null&page=1&userType=&useAltSort=true&_=156493')
  for(let currentPage=1;;currentPage++){
    commentUrl.searchParams.set("page", currentPage)
    yield commentUrl.href
  }
}
}


// keep going until .result.pageModel.nextPage == 0
function* GenerateCommentUrls(episodeUrl){
  
  const {title, episode} = parseTitleEpisode(episodeUrl)
  let firstPage = "https://global.apis.naver.com/commentBox/cbox/web_neo_list_jsonp.json?ticket=webtoon&templateId=default_new&pool=cbox&_callback=a&lang=en&country=&objectId=c_"  + title + '_' + episode +'&categoryId=&pageSize=30&indexSize=30&groupId=&listType=OBJECT&pageType=default&token=null&consumerKey=BasdOXg&snsCode=null&page=1&initialize=true&userType=&useAltSort=true&replyPageSize=30&sort=favorite&_=156493'
  yield firstPage
  for(let currentPage=2;;currentPage++){
    let changeUrl = new URL(firstPage);
    changeUrl.searchParams.delete("initialize")
    changeUrl.searchParams.delete("userType")
    changeUrl.searchParams.delete("useAltSort")
    changeUrl.searchParams.delete("replyPageSize")
    changeUrl.searchParams.set("page", currentPage)
    changeUrl.searchParams.set("refresh", "false")
    yield changeUrl.href
  }
}

const getComment = async url =>{
  const commentUrl  = makeCommentUrl(url)
  
let changeUrl = new URL(commentUrl);
changeUrl.searchParams.delete("initialize")
changeUrl.searchParams.delete("userType")
changeUrl.searchParams.delete("useAltSort")
changeUrl.searchParams.delete("replyPageSize")
changeUrl.searchParams.set("page", 2)
changeUrl.searchParams.set("refresh", "false")

console.log(changeUrl.href)
changeUrl = commentUrl

// result.pageModel.nextPage
// != 
// result.pageModel.lastPage

  const response = await fetch(changeUrl, {headers: {"Referer":"https://www.webtoons.com", "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"}});
  let data = await response.text();
  var remove_function = data.substr(2,data.length - 4)
  var results = JSON.parse(remove_function)
  // assert results.success == "true"

  console.log(results)
  return results
}


function GetCurrentTime(){
  return Date.now()
}

// docker run --name mongodb -v mongodata:/data/db -d -p 27017:27017 mongo

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 


async function GetComments(episodeUrl, generator){
  
  let comments = []
  let total = 0

  let gen = generator(episodeUrl)
  // gen.next = 
  let fetchPage = async commentPageUrl => {
    const response = await fetch(commentPageUrl, {headers: {"Referer":"https://www.webtoons.com", "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"}});
    let data = await response.text();
    var remove_function = data.substr(2,data.length - 4)
    return JSON.parse(remove_function)
  };
  var firstResults = await fetchPage(gen.next().value)

  let genCommentsAsync = async function*(){

    for(x of firstResults.result.bestList){
      yield x
    }
    for(x of firstResults.result.commentList){
      yield x
    }
    for(commentPage of gen){
      var results = await fetchPage(commentPage)
      for(x of results.result.commentList){
        yield x
      }
      if(results.result.pageModel.nextPage == "0"){
        return;
      }
    }
  }
  return {total: firstResults.result.count.total, comments: genCommentsAsync} ;
}

async function LoadCollectionWithComments(episodeUrl, collection, comments){
  for await(let comment of comments()){
          
    comment._id = comment.commentNo
    comment.insertTime = GetCurrentTime()

    var replyCount = comment.replyCount
    comment.replyCount = 0
    var found = await collection.find({_id: comment.commentNo }).toArray()
    if(found.length == 0){
      if(sourceLanguage != "en") {
        comment.contentsTranslated = await Translate(comment.contents)
      }
      var res = await collection.insertOne(comment);
    }
    else if(found[0].replyCount != replyCount){
      comment.replyCount = 0;
      await collection.updateOne({ _id: comment.commentNo }, { $set: { replyCount: 0 } })
    }
    else{
      console.log("DB already had ", comment)
      continue;
    }
    let replies = await GetComments(episodeUrl, MakeGenerateCommentReplyUrls(comment.commentNo))
    await LoadCollectionWithComments(episodeUrl, collection, replies.comments)
    // insert comments
    if(replyCount != 0){          
      await collection.updateOne({ _id: comment.commentNo }, { $set: { replyCount: replyCount } })
    }
  }
}

// GetComments("https://www.webtoons.com/challenge/episode?titleNo=117474&episodeNo=116")

async function UpdateTitle(db, startUrl, comic){

  var startUrlParsed = new URL(startUrl)
  let seriesTitleNo = startUrlParsed.searchParams.get('title_no')
  const collection = db.collection(seriesTitleNo);
  const episodes = db.collection(seriesTitleNo + '_episodes');
  
  await collection.ensureIndex([["insertTime", -1], ["commentNo", -1]])
 
 // collection.createIndexes([{"insertTime": -1, "commentNo": -1}])
  let countGenerated = 0
  
  let old_skip_count = 3
  if(comic.oldCount){
      old_skip_count = comic.oldCount
  }
  let generateOldDaily = false
  if(comic.generateOldDaily){
    generateOldDaily = true
  }
  let generatedOldToday = false
  if(comic.lastGenerated){
    let lastGenerated = new Date(comic.lastGenerated)
    let current = new Date()
    generatedOldToday = lastGenerated.getDate() == current.getDate()
  }

  let episodeGen = getUrls(startUrl)
  for await (let episodeObj of episodeGen){
    if(generateOldDaily && generatedOldToday && countGenerated >= old_skip_count ){
      break
    }
    countGenerated++

    let episodeUrl = episodeObj.url
    const {title, episode} = parseTitleEpisode(episodeUrl)
    const episodeName = title +'_' +episode
   
     comments = await GetComments(episodeUrl, GenerateCommentUrls)

     var found = await episodes.find({_id: episodeName }).toArray()
     if(found.length == 0){
       var res = await episodes.insertOne({_id: episodeName, total: 0, title: episodeObj.title, pic: episodeObj.pic, url: episodeObj.link} );
     }
     if(found.length == 0 || comments.total != found[0].total){
       await LoadCollectionWithComments(episodeUrl, collection, comments.comments)
             
       await episodes.updateOne({ _id: episodeName }, { $set: { total: comments.total } })
     }
     else if(found[0].url != episodeObj.link){
       
       await episodes.updateOne({ _id: episodeName }, { $set: {  title: episodeObj.title, pic: episodeObj.pic, url: episodeObj.link } })
     }

   }
   
}

async function Translate(comment){
  var someRequest = {
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-type': 'application/json',
        'Ocp-Apim-Subscription-Region': 'eastus',
        'X-ClientTraceId': uuidv4().toString()
    },
    params: {
        'api-version': '3.0',
        'from': sourceLanguage,
        'to': ['en']
    },
    data: [{
        'text': comment
    }],
    responseType: 'json'
  } 
  try{
    var resp = await axios(someRequest)
    return resp.data[0].translations[0].text
  }catch(err){
    console.log(comment)
    console.error(err); 
    throw err
  }
}

async function Update(startUrl){



  let client, db;


  try{
     client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
     db = client. db(dbName);
     let currentDate = new Date()
     
     const comics = db.collection("comics");
     let indexPageMiddle = ""
     var allComics = await comics.find().toArray()
     for(let comic of allComics){
      if ('sourceLanguage' in comic) {
        sourceLanguage = comic.sourceLanguage
        subscriptionKey = comic.subscriptionKey
      }else{
        sourceLanguage = "en"
      }
      function GenerateLink(url){return "<a href=\"" + url + "\">"+url+"</a>"}
      indexPageMiddle += "<tr><td>" + comic.title + "</td><td>atom</td><td>all</td><td>" + GenerateLink("https://rss.croppy.duckdns.org/"+comic.seriesNum +"-atom.xml") + "</td></tr>"
      indexPageMiddle += "<tr><td>" + comic.title + "</td><td>atom</td><td>just old</td><td>" + GenerateLink("https://rss.croppy.duckdns.org/"+comic.seriesNum +"-old-atom.xml") + "</td></tr>"
      indexPageMiddle += "<tr><td>" + comic.title + "</td><td>rss</td><td>all</td><td>" + GenerateLink("https://rss.croppy.duckdns.org/"+comic.seriesNum +"-rss.xml") + "</td></tr>"
      indexPageMiddle += "<tr><td>" + comic.title + "</td><td>rss</td><td>just old</td><td>" + GenerateLink("https://rss.croppy.duckdns.org/"+comic.seriesNum +"-old-rss.xml") + "</td></tr>"
      await UpdateTitle(db, comic.link + "&page=1", comic)
      await comics.updateOne({ _id: comic._id }, { $set: {  lastGenerated: currentDate.getTime()} })
     }
    
     await fs.writeFile(feedLocation +"index.html",indexPageBegin + indexPageMiddle + indexPageEnd)

    //  let dCollection = db.collection('collectionName');
    //  let result = await dCollection.find();   
    //  // let result = await dCollection.countDocuments();
    //  // your other codes ....
    //  return result.toArray();
  }
  catch(err){ console.error(err); } // catch any mongo error here
  finally{ client.close(); } // make sure to close your connection after

}

// get comments generator
// check if it exists in DB
// for each comment add a time
// set reply count to 0
// add to DB
// load Replies
// write replies to DB
// update original to contain count of replies


let indexPageBegin = `<!DOCTYPE html>
<html>
<head>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
</head>
<body>

<h2>Feeds</h2>

<table style="width:100%">
  <tr>
    <th>Title</th>
    <th>Feed Type</th>
    <th>All episodes</th> 
    <th>Feed Url</th>
  </tr>`
let indexPageEnd = `
</table>

</body>
</html>
`


// // main()
Update()
 