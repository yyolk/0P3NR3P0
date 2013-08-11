function(doc) {
  if (doc.created_at) {
    emit(doc._id, {
      title: doc.title,
      url: doc.url,
      author: doc.author,
      homepage_url: doc.homepage_url,
      description: doc.description,
      email: doc.email,
      tags: doc.tags
    });
  }
}