function (head, req) {
     
    // specify that we're providing a JSON response

    
    provides('json', function() {
        // create an array for our result set
        var results = [];
        //var configHeader, configFoot;
        var row;
        
        //return{"headers": {{"Access-Control-Allow-Origin": "\"*\""}}}
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
        }

        send(JSON.stringify(results));
        // make sure to stringify the results :)
        

    });
}
