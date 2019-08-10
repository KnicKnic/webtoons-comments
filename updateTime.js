
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const mongoUrl = 'mongodb://rss-webtoons:27017';
// console.log(Date.now())
const dbName = 'rss-webtoons';


async function GenerateFeed(){

    let client, db;
    try{
       client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
       db = client.db(dbName);
       const seriesTitleNo = '117474'
       const collection = db.collection(seriesTitleNo);
       const episodes = db.collection(seriesTitleNo + '_episodes');
       
  
       var posts = await collection.find().toArray()
       let n = 0
       for(let post of posts){
         n+=1
        await collection.updateOne({ _id: post._id }, { $set: {  insertTime: Date.parse(post.modTimeGmt) } })
        console.log(n)
       }
    }
    catch(err){ console.error(err); } // catch any mongo error here
    finally{ client.close(); } // make sure to close your connection after
  
  
  }

  GenerateFeed()
