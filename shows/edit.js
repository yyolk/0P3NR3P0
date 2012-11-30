function(doc, req) {  
  var ddoc = this;
  var Mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);
//
  var indexPath = path.list('index','recent-posts',{descending:true, limit:10});
//  var feedPath = path.list('index','recent-posts',{descending:true, limit:10, format:"atom"});
//  var commentsFeed = path.list('comments','comments',{descending:true, limit:10, format:"atom"});
//
  var data = {
    header : {
      index : indexPath,
    },
    scripts : {},
    pageTitle : doc ? "Edit: "+doc.title : "Create a new post",
  };
  
  if (doc.multipass == ''+req.query.multipass) {
    data.doc = JSON.stringify(doc);
    data.id = doc._id;
    data.created_at = doc.created_at;
    data.multipass = doc.multipass;
    data.title= doc.title;
    data.url = doc.url;
    data.author= doc.author;
    data.homepage_url = doc.homepage_url;
    data.description = doc.description;
    data.tags = doc.tags;
    data.email = doc.email;
    return Mustache.to_html(ddoc.templates.edit, data, ddoc.templates.partials);
  } else {
    return 'Denied '+ req.query.multipass;

  }

  //return Mustache.to_html(ddoc.templates.edit, data, ddoc.templates.partials);
 // return req.query.multipass;
}

