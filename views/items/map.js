function(doc) {
  if (doc.created_at){
      emit(new Date(doc.created_at), doc._id);
  }
  
};