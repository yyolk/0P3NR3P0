function(newDoc, oldDoc, userCtx, secObj){ 
    if('_admin' in userCtx.roles) return; // skip anonymous in Admin Party case;
    if(!userCtx.name && newDoc._deleted){
      throw({'forbidden': 'auth first before delete something'});
    }
}