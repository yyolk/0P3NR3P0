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
        {works: [
            {
                'id': '2d737897c814468aaf0989a49805b017',
                'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis scelerisque dolor, feugiat cursus eros malesuada id. Nullam porta, erat in euismod molestie, turpis tellus pharetra augue, commodo consequat justo felis quis mauris. Donec enim urna, ultrices vel nisi eu, pretium eleifend ex. Cras quis laoreet tortor, quis fermentum ipsum. Sed bibendum maximus ex eu tincidunt. Pellentesque ac ligula nec velit aliquet aliquet vitae ut nunc. Integer imperdiet odio pharetra, porta lectus id, gravida diam. Duis et justo hendrerit, tristique ipsum sit amet, aliquet ex. Nullam eros velit, vulputate in fringilla et, pretium sit amet justo. Aliquam malesuada iaculis mauris, id fringilla magna vehicula a. Nulla suscipit tortor mi, vitae pretium elit dapibus eu. Phasellus consequat ex at iaculis condimentum. Pellentesque molestie molestie massa et facilisis. Integer risus est, finibus eget blandit a, interdum et massa. Donec fringilla vulputate vehicula. Sed est eros, posuere ac porttitor sit amet, sollicitudin blandit sem.',
                'author': 'Testing Bot'
            },
            {
                'id': '2',
                'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis scelerisque dolor, feugiat cursus eros malesuada id. Nullam porta, erat in euismod molestie, turpis tellus pharetra augue, commodo consequat justo felis quis mauris. Donec enim urna, ultrices vel nisi eu, pretium eleifend ex. Cras quis laoreet tortor, quis fermentum ipsum. Sed bibendum maximus ex eu tincidunt. Pellentesque ac ligula nec velit aliquet aliquet vitae ut nunc. Integer imperdiet odio pharetra, porta lectus id, gravida diam. Duis et justo hendrerit, tristique ipsum sit amet, aliquet ex. Nullam eros velit, vulputate in fringilla et, pretium sit amet justo. Aliquam malesuada iaculis mauris, id fringilla magna vehicula a. Nulla suscipit tortor mi, vitae pretium elit dapibus eu. Phasellus consequat ex at iaculis condimentum. Pellentesque molestie molestie massa et facilisis. Integer risus est, finibus eget blandit a, interdum et massa. Donec fringilla vulputate vehicula. Sed est eros, posuere ac porttitor sit amet, sollicitudin blandit sem.',
                'author': 'Testing Bot'
            },
            {
                'id': '32',
                'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis scelerisque dolor, feugiat cursus eros malesuada id. Nullam porta, erat in euismod molestie, turpis tellus pharetra augue, commodo consequat justo felis quis mauris. Donec enim urna, ultrices vel nisi eu, pretium eleifend ex. Cras quis laoreet tortor, quis fermentum ipsum. Sed bibendum maximus ex eu tincidunt. Pellentesque ac ligula nec velit aliquet aliquet vitae ut nunc. Integer imperdiet odio pharetra, porta lectus id, gravida diam. Duis et justo hendrerit, tristique ipsum sit amet, aliquet ex. Nullam eros velit, vulputate in fringilla et, pretium sit amet justo. Aliquam malesuada iaculis mauris, id fringilla magna vehicula a. Nulla suscipit tortor mi, vitae pretium elit dapibus eu. Phasellus consequat ex at iaculis condimentum. Pellentesque molestie molestie massa et facilisis. Integer risus est, finibus eget blandit a, interdum et massa. Donec fringilla vulputate vehicula. Sed est eros, posuere ac porttitor sit amet, sollicitudin blandit sem.',
                'author': 'Testing Bot'
            },
            {
                'id': '24',
                'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis scelerisque dolor, feugiat cursus eros malesuada id. Nullam porta, erat in euismod molestie, turpis tellus pharetra augue, commodo consequat justo felis quis mauris. Donec enim urna, ultrices vel nisi eu, pretium eleifend ex. Cras quis laoreet tortor, quis fermentum ipsum. Sed bibendum maximus ex eu tincidunt. Pellentesque ac ligula nec velit aliquet aliquet vitae ut nunc. Integer imperdiet odio pharetra, porta lectus id, gravida diam. Duis et justo hendrerit, tristique ipsum sit amet, aliquet ex. Nullam eros velit, vulputate in fringilla et, pretium sit amet justo. Aliquam malesuada iaculis mauris, id fringilla magna vehicula a. Nulla suscipit tortor mi, vitae pretium elit dapibus eu. Phasellus consequat ex at iaculis condimentum. Pellentesque molestie molestie massa et facilisis. Integer risus est, finibus eget blandit a, interdum et massa. Donec fringilla vulputate vehicula. Sed est eros, posuere ac porttitor sit amet, sollicitudin blandit sem.',
                'author': 'Testing Bot'
            },
        ]}
        ));
        // send(Mustache.to_html(templates.show.footer, 
        // {}
        // ));
        return templates.show.footer
    });
}
