function(doc) {
  if (doc.show=='netartizens') {
      emit(doc.created_at, {
          id : doc._id,
          title: doc.title,
          url : doc.url,
          author: doc.author,
          homepage_url : doc.homepage_url,
          description : doc.description,
          created_at : doc.created_at,
          tags : doc.tags
      });
  }  
}