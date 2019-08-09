
const fs = require('fs').promises;

const feed_fe = require('feed');
const Feed = feed_fe.Feed;
 


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const mongoUrl = 'mongodb://localhost:27017';
// console.log(Date.now())
const dbName = 'testProject';


let obj = {title: "I wish I were you", seriesNum: "117474", link: "https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474"}

const feed = new Feed({
  title: obj.title,
  description: "This is my personal feed!",
  id: obj.link,
  link: obj.link,
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
//   image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Naver_Line_Webtoon_logo.png",
  image: "https://webtoon-phinf.pstatic.net/20190719_270/15635185426713GnDk_JPEG/40c1bb66-b65d-4dc0-88c6-046b389e679b.jpg",
  
//   favicon: "http://example.com/favicon.ico",
//   copyright: "All rights reserved 2013, John Doe",
//   updated: new Date(2013, 6, 14), // optional, default = today
  generator: "Feed for I wish I were you", // optional, default = 'Feed for Node.js'
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
 
function GetPostUrl(objectId){
    // objectId = 'c_117474_106'
    s = objectId.split('_')
    return 'https://www.webtoons.com/en/challenge/i-wish-i-were-you/chapter-81/viewer?title_no=' + s[1]  + '&episode_no=' + s[2]
}


async function GenerateFeed(){

    let client, db;
    try{
       client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
       db = client.db(dbName);
       const collection = db.collection('117474');
       
  
       var posts = await collection.find().sort( [["insertTime", -1], ["commentNo", -1]]).limit(100).toArray()
    //    console.log(posts)

        generateContent = async function(post){
            let contents = "User: " + post.userName + "<br>Post: " + post.contents
            if(post.commentNo != post.parentCommentNo){
                let parent = (await collection.find({_id: post.parentCommentNo}).toArray())[0]
                contents += "<br>Parent User: " + parent.userName + "<br>Parent Post: " + parent.contents
            }
            return contents
        }

            
        for( post of posts){
            feed.addItem({
            title: post.contents,
            id: post._id,
            link: GetPostUrl(post.objectId),
            // description: post.contents,
            description: post.userName,
            content: await generateContent(post),
            author: [
                {
                name: post.userName 
                }
            ],
            date: new Date(post.insertTime)
            // image: post.image
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

        await fs.writeFile("/tmp/feed.xml",feed.atom1())
        await fs.writeFile("/tmp/rss.xml",feed.rss2())
    }
    catch(err){ console.error(err); } // catch any mongo error here
    finally{ client.close(); } // make sure to close your connection after
  
  
  }

  GenerateFeed()
