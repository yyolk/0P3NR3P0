function(doc, req) {  


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
        "Content-Type:" : "text/html"
       },
      body :  '<head><link rel="stylesheet" href="/style/post.css" type="text/css"></link><title>'+doc.title+' by '+doc.author+'</title></head><body style="'+"background-image:url('" + doc.url +"');"+'"'+"><script src='/script/analytics.js'></script></body>"
    };

  } else {
    return { code : 200, headers : { 
      "Access-Control-Allow-Origin": "*", 
      "Content-Type:" : "text/html"   },
      body: '<html><head><link rel="stylesheet" href="/style/post.css" type="text/css"></link><title>'+doc.title+' by '+doc.author+'</title></head><body><iframe src="'+doc.url+'"></iframe><script src="/script/analytics.js"></script></body></html>'
       };
  }
}