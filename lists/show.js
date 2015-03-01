function (head, req) {
    // !json templates.show.header
    // !json templates.show.section
    // !json templates.show.footer
    var Mustache = require('vendor/couchapp/lib/mustache');
     
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
        send(Mustache.to_html(templates.show.header, 
        {}
        ));
        send(Mustache.to_html(templates.show.section, 
        {}
        ));
        // send(Mustache.to_html(templates.show.footer, 
        // {}
        // ));
        return templates.show.footer
    });
}
