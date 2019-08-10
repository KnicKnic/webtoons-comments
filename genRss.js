
const fs = require('fs').promises;

const feed_fe = require('feed');
const Feed = feed_fe.Feed;
 


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const mongoUrl = 'mongodb://rss-webtoons:27017';
// console.log(Date.now())
const dbName = 'rss-webtoons';


let obj = {title: "I wish I were you", seriesNum: "117474", link: "https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474"}

const feed = new Feed({
  title: obj.title,
  description: "Feed for " + obj.title,
  id: obj.link,
  link: obj.link,
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Naver_Line_Webtoon_logo.png",
//   image: "https://webtoon-phinf.pstatic.net/20190719_270/15635185426713GnDk_JPEG/40c1bb66-b65d-4dc0-88c6-046b389e679b.jpg",
  
  favicon: "https://webtoons-static.pstatic.net/image/favicon/favicon.ico?dt=2017082301",
//   copyright: "All rights reserved 2013, John Doe",
//   updated: new Date(2013, 6, 14), // optional, default = today
  generator: "croppy", // optional, default = 'Feed for Node.js'
//   feedLinks: {
//     json: "https://example.com/json",
//     atom: "https://example.com/atom"
//   },
//   author: {
//     name: "John Doe",
//     email: "johndoe@example.com",
//     link: "https://example.com/johndoe"
//   }
});

async function GenerateFeed(){

    let client, db;
    try{
       client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
       db = client.db(dbName);
       const seriesTitleNo = obj.seriesNum
       const collection = db.collection(seriesTitleNo);
       const episodes = db.collection(seriesTitleNo + '_episodes');
       
  
       var posts = await collection.find().sort( [["insertTime", -1], ["commentNo", -1]]).limit(100).toArray()
    //    console.log(posts)

        getEpisodeRow = async function (post){
            s = post.objectId.split('_')
            const episodeNo=s[2]
            const titleNo=s[1]
            return (await episodes.find({_id: titleNo + "_"+episodeNo}).toArray())[0]
        }

        generateContent = async function(post){            
            let episodeRow = await getEpisodeRow(post)
            const picUrl = episodeRow.pic
            const title = episodeRow.title
            let contents = /* "<img src=\"" + picUrl + "\"/>" + "<p>" +*/ "Chapter: " + title +"</p><p>User: " + post.userName + "</p><p>Post: " + post.contents + "</p>"
            if(post.commentNo != post.parentCommentNo){
                let parent = (await collection.find({_id: post.parentCommentNo}).toArray())[0]
                contents += "<br>Parent User: " + parent.userName + "<br>Parent Post: " + parent.contents
            }
            return contents
        }

        getPostUrl = async function (post){           
            let episodeRow = await getEpisodeRow(post)
            return episodeRow.url
        }
            
        for( post of posts){
            feed.addItem({
            title: post.contents,
            id: post._id,
            link: await getPostUrl(post),
            // description: post.contents,
            description: await generateContent(post), //post.userName,
            // content: await generateContent(post),
            author: [
                {
                name: post.userName 
                }
            ],
            date: new Date(post.modTimeGmt)
            // image: post.image
            // image: 'https://webtoon-phinf.pstatic.net/20190731_237/1564534544145ItKfB_JPEG/eeac74b4-62fb-423f-a8ed-a8e66f26d319.jpg?type=q90'
            });
        };
        
        // feed.addCategory("Technologie");
        
        // feed.addContributor({
        //     name: "Johan Cruyff",
        //     email: "johancruyff@example.com",
        //     link: "https://example.com/johancruyff"
        // }
        // );
        
        // console.log(feed.rss2());
        // // Output: RSS 2.0
        
        // console.log(feed.atom1());
        // // Output: Atom 1.0
        
        // console.log(feed.json1());

        await fs.writeFile("/feed/" + obj.seriesNum + "-atom.xml",feed.atom1())
        await fs.writeFile("/feed/" + obj.seriesNum + "-rss.xml",feed.rss2())
    }
    catch(err){ console.error(err); } // catch any mongo error here
    finally{ client.close(); } // make sure to close your connection after
  
  
  }

  GenerateFeed()
