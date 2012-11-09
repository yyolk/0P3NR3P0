function(doc) {
  if (doc.created_at) {
      emit(doc.created_at, {
          url : doc.url,
          homepage_url : doc.homepage_url,
          Description : doc.Description,
          tags : doc.tags
      });
  }
};

