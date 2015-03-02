function (head, req) {
    // !json templates.show.header
    // !json templates.show.section
    // !json templates.show.footer
    var Mustache = require('vendor/couchapp/lib/mustache');
    var logo = require('vendor/openrepo/logo');
     
    // specify that we're providing a JSON response

    // send(JSON.stringify(head));
    provides('json', function() {
        
        var results = [];
        
        var row;
        
        
        while (row = getRow()) {
            results.push({
                id : row.value._id,
                title: row.value.title,
                url : row.value.url,
                author: row.value.author,
                homepage_url : row.value.homepage_url,
                description : row.value.description,
                tags : row.value.tags

            });
            // send(JSON.stringify(row.value));
        }

        // make sure to stringify the results :)
        send(JSON.stringify(results));
        // send(results);

    });
    provides('html', function() {
        var row, key, counter;
        counter = 0;
        var works = [];

        send(templates.show.header);

        while (row = getRow()) {
            var piece = row.value;
            key = row.key;
            works.push(piece);
            counter++
            if (counter % 4 == 0) {
                send(Mustache.to_html(templates.show.section, 
                {works: works}
                ));
                works = [];
                counter = 0;
            }
        }

        //send any remaining works
        send(Mustache.to_html(templates.show.section, 
            {works: works}
        ));
        var logoMap = {
            'netartizens': "netartizens.png",
            'furtherfield': "furtherfield_logo.png",
            'glitChicago': "glitchicago.jpg"
        }
        // var show_logo = logoMap[req.path[req.path.length-1]]
        var show_logo = logo.getShowLogo(req);
        return Mustache.to_html(
            templates.show.footer, {
                show_logo: show_logo,
            });
    });
}
