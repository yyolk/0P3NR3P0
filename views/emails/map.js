function(doc) {
  if(doc.email){
    emit(doc.author, doc.email);
  }
}