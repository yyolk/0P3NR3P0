function(doc, req){
  // !json templates.entryview
  var Mustache = require('vendor/couchapp/lib/mustache');
  var logo = require('vendor/openrepo/logo')
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
  return Mustache.to_html(templates.entryview, {
    doc: doc,
    url: doc.url,
    title: doc.title,
    artist_name: doc.author,
    artist_email: doc.email,
    artist_homepage_url: doc.homepage_url,
    description: doc.description,
    show_logo: logo.getShowLogo(doc.show)
  });
}