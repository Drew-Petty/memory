function makeId(length) {
    var result= '';
    var characters= '1234567890';
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

module.exports = {
    makeId
}