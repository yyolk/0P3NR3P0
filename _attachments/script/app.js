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
                //setupChanges(data.update_seq);
                var them = $.mustache($("#recent-links").html(), {
                    items : data.rows.map(function(r) {return r.value;})
                });
                console.log(them);
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
    $("#create-link").submit(function(e){
        e.preventDefault();
        var form = this, doc = $(form).serializeObject();
        doc.created_at = new Date();
        db.saveDoc(doc, {success : function() {form.reset();}});
    }).find("input").focus();


});
