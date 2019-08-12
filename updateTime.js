
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL

const mongoUrl = 'mongodb://rss-webtoons:27017';
const dbName = 'rss-webtoons';
// const mongoUrl = 'mongodb://localhost:27017';
// const dbName = 'testProject';


async function GenerateFeed(){

    let client, db;
    try{
       client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
       db = client.db(dbName);
       
       async function UpdateTimes(collection){
          var posts = await collection.find().toArray()
          let n = 0
          for(let post of posts){
            n+=1
            await collection.updateOne({ _id: post._id }, { $set: {  insertTime: Date.parse(post.modTimeGmt) } })
            console.log(n)
          }
       }
       
     const comics = db.collection("comics");

     var allComics = await comics.find().toArray()
     for(let comic of allComics){
      const seriesTitleNo = comic.seriesNum
      const collection = db.collection(seriesTitleNo);
      //  const episodes = db.collection(seriesTitleNo + '_episodes');
      await UpdateTimes(collection)
     }
    }
    catch(err){ console.error(err); } // catch any mongo error here
    finally{ client.close(); } // make sure to close your connection after
  
  
  }

  GenerateFeed()
