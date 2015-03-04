function(head, req) {
  var ddoc = this;
  
  var List = require("vendor/couchapp/lib/list");
  var path = require("vendor/couchapp/lib/path").init(req);
  var Atom = require("vendor/couchapp/lib/atom");

  var indexPath = path.list('index','recent-posts',{descending:true, limit:10});
  var feedPath = path.list('atom','furtherfield',{descending:true, limit:10, format:"atom"});

  var path_parts = req.path;
  // if the client requests an atom feed and not html, 
  // we run this function to generate the feed.
  provides("atom", function() {    
    var path = require("vendor/couchapp/lib/path").init(req);
    var markdown = require("vendor/couchapp/lib/markdown");
    var textile = require("vendor/textile/textile");

    // we load the first row to find the most recent change date
    var row = getRow();
    
    // generate the feed header
    var feedHeader = Atom.header({
      updated : (row ? new Date(row.value.created_at) : new Date()),
      title : "0P3NR3P0",
      feed_id : "http://0p3nr3p0.net/atom/" + req.path[req.path.length-1] + "?format=atom",
      feed_link : path.absolute(feedPath),
    });
    
    // send the header to the client
    send(feedHeader);

    // loop over all rows
    if (row) {
      do {
        // generate the entry for this row
        var feedEntry = Atom.entry({
          entry_id : "http://0p3nr3p0.net/piece/" + row.id,
          title : row.value.title,
          content : "http://0p3nr3p0.net/piece/" + row.id,
          updated : new Date(row.value.created_at),
          author : row.value.author,
          description : row.value.description,
          alternate: row.value.url
        });
        // send the entry to client
        send(feedEntry);
      } while (row = getRow());
    }

    // close the loop after all rows are rendered
    return "</feed>";
  });
};