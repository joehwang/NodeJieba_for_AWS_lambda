var request = require("request");
var cheerio = require("cheerio");
var nodejieba = require("nodejieba");
var async = require('async');
//var result = nodejieba.cut("上傳資料");
//console.log(result);
//crawl=cheerio.load("http://pixwed.com")
//console.log(crawl)
//["南京市","长江大桥"]
exports.handler = function(event, context,response) {
async.waterfall([
  function requrl(next){
      request({
    url: "http://news.ltn.com.tw/news/world/breakingnews/2004072",
    method: "GET"
    }, function(e,r,b) { /* Callback 函式 */
    /* e: 錯誤代碼 */
    /* b: 傳回的資料內容 */
    if (e==null) {
      next(null,b)
    }
    });
  },
  function showcrawel(b,next){
    $ = cheerio.load(b);
    titles = $("div#newstext p").text();
    console.log(titles)

    split=nodejieba.extract(titles,4)
    console.log(split)
  }

],
function(err){

})

}
exports.handler();
