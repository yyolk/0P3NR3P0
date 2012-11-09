function(doc) {
  if (doc.created_at) {
      var p = doc.profile || {};
      emit(doc.created_at, {
          message:doc.message,
          nickname : p.nickname,
          name : doc.name
      });
  }
};

