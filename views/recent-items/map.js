function(doc) {
  if (doc.created_at) {
      emit(doc.created_at, {
          url : doc.url,
          homepage_url : doc.homepage_url,
          description : doc.description,
          tags : doc.tags
      });
  }
};

