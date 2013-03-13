function(doc) {
  var count = 0;
  if (doc.author){
    emit(doc.id, 1);
  }  
}