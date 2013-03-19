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
      body :  '<head><link rel="stylesheet" href="/openrepo/_design/0P3NR3P0/style/post.css" type="text/css"></link></head><body style="'+"background-image:url('" + doc.url +"');"+'"'+"></body>"
    };
  } else if(checkFB(doc.url)){
    return { code : 302, headers : { "Access-Control-Allow-Origin": "*", "Location" : doc.url } };

  } else {
    return { code : 200, headers : { 
      "Access-Control-Allow-Origin": "*", 
      "Content-Type:" : "text/html"   },
      body: '<html><head><link rel="stylesheet" href="/openrepo/_design/0P3NR3P0/style/post.css" type="text/css"></link></head><body><iframe src="'+doc.url+'"></iframe></body></html>'
       };
  }
}