function(doc) {
  if (doc.created_at) {
    emit(doc.multipass, {
      id : doc._id,
      title: doc.title,
      email: doc.email,
      url : doc.url,
      author: doc.author,
      homepage_url : doc.homepage_url,
      description : doc.description,
      created_at : doc.created_at,
      tags : doc.tags
    });
  }
}