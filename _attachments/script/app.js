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


    $("#newitemform").html($.mustache($("#new-link").html()));


    function setupChanges(since) {
        if (!changesRunning) {
            var changeHandler = db.changes(since);
            changesRunning = true;
            changeHandler.onChange(drawItems);
        }
    }

    function checkFields(doc){
        var valid = true;
        for (var i in doc){
            if (!doc[i]) valid=false;
            switch (i){

                case 'url':
                    if (!ValidURL(doc[i])) valid=false;
                    //else doc[i] = linkify(doc[i]);
                    break;
                case 'homepage_url':
                    if (!ValidURL(doc[i])) valid=false;
                    else doc[i] = linkify(doc[i]);
                    break;
                case 'description':
                    break;
                case 'tags':
                    doc[i] = doc[i].split(" ");
                    break;
                case 'created_at':
                    break;
                default:
                    console.log('nothing hit!');

            }
        }
        return valid;
    }


    $("#create-link").submit(function(e){
        e.preventDefault();
        var form = this, doc = $(form).serializeObject();
        doc.created_at = new Date();
        if (!checkFields(doc)) { 
            alert('please insert valid items into the form!');
            //would like this to go directly to the messed up field.
            //$(this).find("input[name=url]").focus();
            }
        else{
            db.saveDoc(doc, {success : function() {form.reset();}});}
    }).find("input").focus();

    function findLinks(){
        $("p.url").each(function() {
            $(this).html(linkify($(this).text()));
        });

    }
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
        var pattern = new RegExp('http://[a-z].[a-z].?[a-z].?[a-z]'); // fragment locater
        if(!pattern.test(str)) {
            //alert("Please enter a valid URL.");
            return false;
        } else {
            return true;
        }
    }


});
