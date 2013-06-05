function(doc, req) {  
  var ddoc = this;
  var Mustache = require("vendor/couchapp/lib/mustache");
  var path = require("vendor/couchapp/lib/path").init(req);

  var indexPath = path.list('index','recent-posts',{descending:true, limit:10});
  var data = {
    header : {
      index : indexPath,
    },
    scripts : {},
    pageTitle : "Edit: "+doc.title,
  };

  data.id = doc._id;
  data.title = doc.title;
  data.author = doc.author;
  data.nfo = doc.description;
  data.homepage_url = doc.homepage_url;

  return Mustache.to_html(ddoc.templates.didactic, data, ddoc.templates.partials);
  
}