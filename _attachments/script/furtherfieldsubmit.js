// var auth = new Array();  
var auth = [];
//query for the author
$((function() {
  // LIST OUT LINEUP
  $.ajax({
    url: 'http://0p3nr3p0.net/_view/furtherfield',
    type: 'get',
    dataType: 'jsonp',
    success: function(data) {
      $(data).each(function(index, el) {
        $(el.rows).each(function(k, v) {
          $(v.value).each(function(k, v) {
            auth.push(v.author);
          });
        });
      });
    }
  });

})());


$(function() {

  function checkDuplicateAuthor(author) {

    //var a = document.getElementById('author').value;

    var x = auth.indexOf(author);
    console.log("i see auth as");
    console.log(auth);
    if (x >= 0) {
      return true;
    } else {
      return false;
    }

  }

  function stripName(name){
    return name.toLowerCase().replace(/^\s+|\s+$/g, '');
  }

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


  function stripTrailingSlash(str) {
    if (str.substr(-1) == '/') {
      return str.substr(0, str.length - 1);
    }
    return str;
  }

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
    if (!pattern.test(str)) {
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
      return "http://youtube.googleapis.com/v/" + match[1] + "&autoplay=1";
      //return true;
    }
  }

  function vimeoURL(str) {
    var pattern = new RegExp(/^http[s]?:\/\/[www\.]?vimeo\.com\/(\d+)$/);
    if (!pattern.test(str)) {
      return false;
    } else {
      // return new embed code
      var match = pattern.exec(str);
      //alert('vimeo id'+match[1]);
      return "http://player.vimeo.com/video/" + match[1] + "?autoplay=1";
      //return true;
    }
  }

  function ValidEmail(str) {
    var pattern = new RegExp(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);
    if (!pattern.test(str)) {
      return false;
    } else {
      return true;
    }
  }


  function checkFields(doc) {
    var valid = true;
    var invalid = "";

    for (var i in doc) {
      if (!doc[i]) valid = false;
      switch (i) {

        case 'url':
          // is this a valid url?
          if (!ValidURL(doc[i])) invalid = 'url';
          // remove any trailing slashes //fixes bug with setting this as the
          // _doc.id
          doc[i] = stripTrailingSlash(doc[i]);
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
          if (checkDuplicateAuthor(doc[i])) invalid = 'dupeauthor';
          break;
        case 'homepage_url':
          if (!ValidURL(doc[i])) invalid = 'homepage_url';
          //else doc[i] = linkify(doc[i]);
          break;
        case 'email':
          if (!ValidEmail(doc[i])) invalid = 'email';
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
    if (invalid) valid = false;
    if (!valid) {
      return invalid;
    } else {
      return true;
    }
  }

  var db = $.couch.db("openrepo");
  $("#create-link").submit(function(e) {
    e.preventDefault();
    var form = this,
      doc = $(form).serializeObject();
    doc.created_at = new Date();
    // check to see if everything is filled in

    var valid = checkFields(doc);
    console.log("Valid: %s", valid);
    if (valid === true) {
      // $(this).find("input[type='submit']").attr("disabled", "disabled");
      // need to return valid as well as where it fuxs up
      //would like this to go directly to the messed up field.
      //$(this).find("input[name=url]").focus();
      var pattern = new RegExp(/^http[s]?:\/\/([\.\/a-zA-Z0-9-_]*)[?]?/);
      var match = pattern.exec(doc.url);
      var uurl = match[1];
      doc._id = hex_md5(uurl);
      doc.multipass = hex_md5(Date());

      db.saveDoc(doc, {
        success: function() {
          // send the user to the post-submission thank-you and through the emailer
          window.location = "http://gli.tc/h/0P3NR3P0_sample_gallery/email.php?email="+doc.email+"&multipass="+doc.multipass+"&author="+doc.author+"&title="+doc.title+"&url="+uurl+"&docid="+doc._id
        },
        error: function() {
          alert("This link is already in the repo! Please use your original edit URL to add it to the Furtherfield show.")
        }
      });
    } else {
      if (valid === 'email') alert("we need your email in order to send you an edit link for your submission, and to provide potential curators with a way to contact you (it email will not be displayed anywhere else nor will it be added to any mailing lists)");
      if (valid === 'dupeauthor') alert("You're already in the show! ...but, if you want to change your entry, you can always do so using the edit URL which was emailed to you with your initial entry");
      else alert("Please enter something valid for " + valid);
      $(this).find("[name=" + valid + "]").focus();
    }
  });

});