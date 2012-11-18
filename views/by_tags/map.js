function(doc) {
    if (doc.tags == []) return;

    var emit_sequence = function(base, disp) {
        if (disp.length > 1) {
            emit(base.concat(disp[0]), {
          id : doc._id,
          title: doc.title,
          url : doc.url,
          author: doc.author,
          homepage_url : doc.homepage_url,
          description : doc.description,
          tags : doc.tags
      });
            emit_sequence(base.concat(disp[0]), disp.slice(1, disp.length));
            emit_sequence(base, disp.slice(1, disp.length));
        } else if (disp.length == 1) {
            emit(base.concat(disp[0]), {
          id : doc._id,
          title: doc.title,
          url : doc.url,
          author: doc.author,
          homepage_url : doc.homepage_url,
          description : doc.description,
          tags : doc.tags
      });
        }
    }

    emit_sequence([], doc.tags);
}
