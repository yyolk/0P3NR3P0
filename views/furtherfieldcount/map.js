function(doc) {
  if (doc.tags[0]=='furtherfieldgallery') {
    emit(doc.id, 1);
  }
}