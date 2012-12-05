function(doc, req) {  


  function checkImg(str){
    var pattern = new RegExp(/\.(gif|jpg|jpeg|tiff|png)$/i);
    if (pattern.test(str)){
      return true;
    }else{
      return false;
    }
  }
    return {

        body :  (checkImg(''+doc.url)) ? "<head><link rel='stylesheet' href='/openrepo/_design/0P3NR3P0/style/post.css' type='text/css' ></link></head><body style="+"background-image:url('" + doc.url +"');"+"></body>" : doc.url

    }
}
