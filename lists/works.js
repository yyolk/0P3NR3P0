function(head, req) {
    var row, key;
    while (row = getRow()){
        var post = row.value;
        key = row.key;
    send(template(templates.index.row, {
        url : post.url,
        homepage_url : post.homepage_url,
        description: post.description,
        date : post.created_at,
        link : showPath('post', row.id)
    }));
    }
  
}
