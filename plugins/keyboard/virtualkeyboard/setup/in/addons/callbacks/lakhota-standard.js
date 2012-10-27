function(chr, buf){
    if (chr=='\u0008') { // backspace
        if (buf.length) {
            return [buf.slice(0,-1),buf.length-1]
        } 
    } else if(/[^A-z']/.test(chr)){
        return VirtualKeyboard.Langs.LA.remap[buf+chr] || [buf+chr, 0]
    } else { //non backspace
        return VirtualKeyboard.Langs.LA.remap[buf+chr] || [buf+chr, 1]
    }
}
