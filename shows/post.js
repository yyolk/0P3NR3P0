function(doc, req) {  


  function checkImg(str){
    var pattern = new RegExp(/\.(gif|jpg|jpeg|tiff|png)$/i);
    if (pattern.test(str)){
      return true;
    }else{
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
  } else {
    return { code : 301, headers : { "Access-Control-Allow-Origin": "*", "Location" : doc.url } };
  }
}