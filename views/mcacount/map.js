function(doc) {
  if (doc.tags[0]=='mcainternetsuperheroes') {
    emit(doc.id, 1);
  }
}