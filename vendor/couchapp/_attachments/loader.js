
function couchapp_load(scripts) {
  for (var i=0; i < scripts.length; i++) {
    document.write('<script src="'+scripts[i]+'"><\/script>')
  };
};

couchapp_load([
  "/vendor/iriscouch/sha1.js",
  "/vendor/iriscouch/json2.js",
  "/vendor/iriscouch/jquery.js",
  "/vendor/iriscouch/jquery.couch.js",
  "/vendor/couchapp/jquery.couch.app.js",
  "/vendor/couchapp/jquery.couch.app.util.js",
  "/vendor/couchapp/md5.js"
  ]);