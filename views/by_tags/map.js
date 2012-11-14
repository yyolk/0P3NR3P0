function(doc) {
    if (doc.tags == []) return;

    var emit_sequence = function(base, disp) {
        if (disp.length > 1) {
            emit(base.concat(disp[0]), 1);
            emit_sequence(base.concat(disp[0]), disp.slice(1, disp.length));
            emit_sequence(base, disp.slice(1, disp.length));
        } else if (disp.length == 1) {
            emit(base.concat(disp[0]), 1);
        }
    }

    emit_sequence([], doc.tags);
}

