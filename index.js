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
      // let picUrl = item.childNodes[1].childNodes[1].childNodes[1].attribs.src
      // let chapterName = item.childNodes[1].childNodes[1].childNodes[1].attribs.alt
      foundUrls.push(comicUrl)
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
    for(x of pageUrls){
      if(!s.has(x))
      {
        yield x
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

// GetComments(urls[1])

async function Update(startUrl){



  let client, db;


  try{
     client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
     db = client.db(dbName);
     var startUrlParsed = new URL(startUrl)
     let seriesTitleNo = startUrlParsed.searchParams.get('title_no')
     const collection = db.collection(seriesTitleNo);
     const episodes = db.collection(seriesTitleNo + '_episodes');
     
     collection.ensureIndex([["insertTime", -1], ["commentNo", -1]])

     let episodeGen = getUrls(startUrl)
     for await (episodeUrl of episodeGen){
    
      const {title, episode} = parseTitleEpisode(episodeUrl)
      const episodeName = title +'_' +episode
      
        comments = await GetComments(episodeUrl, GenerateCommentUrls)

        var found = await episodes.find({_id: episodeName }).toArray()
        if(found.length == 0){
          var res = await episodes.insertOne({_id: episodeName, total: 0} );
        }
        if(found.length == 0 || comments.total != found[0].total){
          await LoadCollectionWithComments(episodeUrl, collection, comments.comments)
                
          await episodes.updateOne({ _id: episodeName }, { $set: { total: comments.total } })
        }

      }
      

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

// Connection URL
const mongoUrl = 'mongodb://localhost:27017';
// console.log(Date.now())
const dbName = 'testProject';
async function main(){

  let client, db;
  try{
    let page = await getUrls.next()
    var comments = await getComment(page.value)
    for(x of comments.result.commentList){
      x._id = x.commentNo
      x.insertTime = GetCurrentTime()
    }
     client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
     db = client.db(dbName);
     const collection = db.collection('t1');
     collection.ensureIndex([["insertTime", -1], ["commentNo", -1]])
     // Insert some documents
     var res = await collection.insertMany(comments.result.commentList);
     console.log(res)

     var found = await collection.find().sort( [["insertTime", -1], ["commentNo", -1]]).limit(10).toArray()
     console.log(found)
    //  let dCollection = db.collection('collectionName');
    //  let result = await dCollection.find();   
    //  // let result = await dCollection.countDocuments();
    //  // your other codes ....
    //  return result.toArray();
  }
  catch(err){ console.error(err); } // catch any mongo error here
  finally{ client.close(); } // make sure to close your connection after


}

// // main()
Update(startUrl)
 