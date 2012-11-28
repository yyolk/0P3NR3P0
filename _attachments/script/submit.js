$(function() {   
  // friendly helper http://tinyurl.com/6aow6yn
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };


  //helper functions
  function linkify(inputText) {
    var replaceText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText
  }

  function ValidURL(str) {
    var pattern = new RegExp('http[s]?://[a-z].[a-z].?[a-z].?[a-z]'); // fragment locater
      if(!pattern.test(str)) {
        //alert("Please enter a valid URL.");
        return false;
      } else {
        return true;
      }
  }

  function youtubeURL(str) { 
    var pattern = new RegExp(/^http:\/\/(?:www\.)?youtube.com\/watch\?(?=[^?]*v=(\w+))(?:[^\s?]+)?$/);
    if (!pattern.test(str)) {
      return false;
    } else { 
      // return new embed code
      var match = pattern.exec(str);
      //alert('youtube id'+match[1]);
      return "http://www.youtube.com/embed/"+match[1];
      //return true;
    }
  }

  function vimeoURL(str) {
    var pattern = new RegExp(/^http[s?]:\/\/[www\.]?vimeo\.com\/(\d+)$/);
    if (!pattern.test(str)) {
      return false;
    } else { 
      // return new embed code
      var match = pattern.exec(str);
      //alert('vimeo id'+match[1]);
      return "http://player.vimeo.com/video/"+match[1];
      //return true;
    }
  }


  //begin meaty couch js code
  $("#newitemform").html($.mustache($("#new-link").html()));



  function checkFields(doc){
    var valid = true;
    var invalid = "";
    for (var i in doc){
      if (!doc[i]) valid=false;
      switch (i){

        case 'url':
          // is this a valid url?
          if (!ValidURL(doc[i])) invalid='url';
          // is this a youtube URL?
          if (youtubeURL(doc[i])) doc[i] = youtubeURL(doc[i]);
          // is this a vimeo URL?
          if (vimeoURL(doc[i])) doc[i] = vimeoURL(doc[i]);
          //not needed since we're
          //going straight to iframe
          //else doc[i] = linkify(doc[i]); 
          break;
        case 'author':
          if (doc[i] == "") invalid = 'author';
          
          break;
        case 'homepage_url':
          if (!ValidURL(doc[i])) invalid='homepage_url';
          //else doc[i] = linkify(doc[i]);
          break;
        case 'description':
          if (doc[i] == "") invalid = 'description';
          break;
        case 'tags':
          if (doc[i] == '') invalid = 'tags';
          else doc[i] = doc[i].split(" ");
          break;
        case 'created_at':
          break;
        default:
          break;

        
      }
    }
    if (!valid){
    return invalid;
    } else{
    return true;
    }
  }

  var path = unescape(document.location.pathname).split('/'),
      design = path[3],
      db = $.couch.db(path[1]);

  function drawItems() {
    db.view(design + "/recent-items", {
      descending : "true",
      limit : 50,
      update_seq : true,
      success : function(data) {
        setupChanges(data.update_seq);
        var them = $.mustache($("#recent-links").html(), {
          items : data.rows.map(function(r) {return r.value;})
        });
        $("#content").html(them);
      }
    });

  };
  drawItems();
  var changesRunning = false;

  function setupChanges(since) {
    if (!changesRunning) {
      var changeHandler = db.changes(since);
      changesRunning = true;
      changeHandler.onChange(drawItems);
    }
  }
  $("#create-link").submit(function(e){
    e.preventDefault();
    var form = this, doc = $(form).serializeObject();
    doc.created_at = new Date();
    // check to see if everything is filled in
    var valid = checkFields(doc);
    if (valid === true) { 
      // need to return valid as well as where it fuxs up
      //would like this to go directly to the messed up field.
      //$(this).find("input[name=url]").focus();
       doc._id = doc.url;
       db.saveDoc(doc, {
         success : function() {form.reset();},
         error: function(){ alert("This link is already in the repo!");}
       });
    }
    else{
      alert("Please enter something valid for "+valid); 
      $(this).find("[name="+valid+"]").focus();
    }
  }).find("input").focus();



});
