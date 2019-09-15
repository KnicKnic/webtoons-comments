
const fs = require('fs').promises;
var os = require('os');

const feed_fe = require('feed');
const Feed = feed_fe.Feed;
 


const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
let mongoUrl = 'mongodb://rss-webtoons:27017';
let dbName = 'rss-webtoons';
let feedLocation = "/feed/"
if(os.platform() == "win32"){
  mongoUrl = 'mongodb://localhost:27017';
  dbName = 'testProject';
  feedLocation = "c:\\tmp\\"
}


/*https://www.webtoons.com/en/challenge/sunny-side-skies/list?title_no=70280
{_id: "70280", generateOldDaily: true, typePrefix: "c_", title: "Sunny Side Skies", seriesNum: "70280", link: "https://www.webtoons.com/en/challenge/sunny-side-skies/list?title_no=70280"}

{_id: "117474", typePrefix: "c_", title: "I wish I were you", seriesNum: "117474", link: "https://www.webtoons.com/en/challenge/i-wish-i-were-you/list?title_no=117474"}
{_id: "303991", typePrefix: "c_", title: "Draigon", seriesNum: "303991", link: "https://www.webtoons.com/en/challenge/draigon/list?title_no=303991"}
{_id: "212675", typePrefix: "c_", title: "Lamp-chan", seriesNum: "212675", link: "https://www.webtoons.com/en/challenge/lamp-chan/list?title_no=212675"}
*/

async function GenerateFeed(){

    let client, db;
    try{
       client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
       db = client.db(dbName);
       
        const comics = db.collection("comics");

        var allComics = await comics.find().toArray()
        
       for(let obj of allComics){
            let old_skip_count = 3
            if(obj.oldCount){
                old_skip_count = obj.oldCount
            }
            const seriesTitleNo = obj.seriesNum
            const collection = db.collection(seriesTitleNo);
            const episodes = db.collection(seriesTitleNo + '_episodes');
            

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
                async function MakeFeed(posts, title){
                    const feed = new Feed({
                        title: title,
                        description: "Feed for " + obj.title,
                        id: obj.link,
                        link: obj.link,
                        language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
                        // image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Naver_Line_Webtoon_logo.png",
                    //   image: "https://webtoon-phinf.pstatic.net/20190719_270/15635185426713GnDk_JPEG/40c1bb66-b65d-4dc0-88c6-046b389e679b.jpg",
                        
                        // favicon: "https://webtoons-static.pstatic.net/image/favicon/favicon.ico?dt=2017082301",
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
                    
                    for( post of posts){
                        feed.addItem({
                        title: post.contents,
                        guid: post._id.toString(),
                        id: post._id.toString(),
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
                    
                    return feed
                }
                
            var posts = await collection.find().sort( [["insertTime", -1], ["commentNo", -1]]).limit(100).toArray()
            let feed = await MakeFeed(posts, obj.title)

            await fs.writeFile(feedLocation + obj.seriesNum + "-atom.xml",feed.atom1())
            await fs.writeFile(feedLocation + obj.seriesNum + "-rss.xml",feed.rss2())

            // get posts, but not newest ones

            function EpisodeGetEpisodeNumber(episode){return Number(episode._id.split("_")[1])}

            var allEpisodes = await episodes.find().toArray()
            function idSorter(a,b){
                let aEp = EpisodeGetEpisodeNumber(a)
                let bEp = EpisodeGetEpisodeNumber(b)
                return bEp - aEp
            }
            allEpisodes.sort(idSorter)

            toFilter = []
            for(let i = 0; i< allEpisodes.length && i< old_skip_count; ++i){
                toFilter.push(obj.typePrefix + allEpisodes[i]._id)
            }

            posts = await collection.find().sort( [["insertTime", -1], ["commentNo", -1]]).filter({objectId: {$nin: toFilter}}).limit(100).toArray()
            feed = await MakeFeed(posts, "Old: "+ obj.title)

            await fs.writeFile(feedLocation + obj.seriesNum + "-old-atom.xml",feed.atom1())
            await fs.writeFile(feedLocation + obj.seriesNum + "-old-rss.xml",feed.rss2())
       }   
    }
    catch(err){ console.error(err); } // catch any mongo error here
    finally{ client.close(); } // make sure to close your connection after
  
  
  }

  GenerateFeed()
