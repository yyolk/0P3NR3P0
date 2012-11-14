function(doc, req) {  
    return {
        body : "<style type='text/css'>*{margin:0;padding:0;} iframe { border:none;  width:100%; height:100%;}</style>"+"<iframe src='"+doc.url+"'></iframe>"

    }
}
