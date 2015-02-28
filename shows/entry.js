function(doc, req){
  // !json templates.entryview
  var Mustache = require('vendor/couchapp/lib/mustache');

  function checkImg(str){
    var pattern = new RegExp(/\.(gif|jpg|jpeg|tiff|png)$/i);
    if (pattern.test(str)){
      return true;
    }else{
      return false;
    }
  }
  function checkFB(str){
    var pattern = new RegExp(/^https:\/\/www\.facebook\.com.*$/i);
    if (pattern.test(str)){
      return true;
    } else{
      return false;
    }
  }
  function checkMPF(str){
    var pattern = new RegExp(/\.(mp4)$/i);
    if (pattern.test(str)){
      return true;
    } else {
      return false;
    }
  }
  if(checkImg(doc.url)){
    return {
      code : 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "X-Frame-Options": "ALLOWALL",
        "Content-Type:" : "text/html"
       },
      body :  '<head><link rel="stylesheet" href="/style/post.css" type="text/css"></link><title>'+doc.title+' by '+doc.author+'</title></head><body style="'+"background-image:url('" + doc.url +"');"+'"'+"></body>"
    };
  } else {
    // return {
    //   code: 200,
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "text/html"
    //   },
    //   body: templates.entryview
    // }
    return Mustache.to_html(templates.entryview, {
      doc: doc,
      url: doc.url,
      title: doc.title,
      artist_name: doc.author,
      artist_email: doc.email,
      artist_homepage_url: doc.homepage_url,
      description: doc.description
    });
  }
}