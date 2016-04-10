/**
 * Created by mikedanylov on 4/10/16.
 */

SearchSource.defineSource('songs', (searchText) => {
    let options, regExp, selector;

    options = {sort: {name: -1}, limit: 10};

    if(searchText) {
        regExp = buildRegExp(searchText);
        selector = {$or: [
            {name: regExp},
            {artist: regExp}
        ]};
        return Songs.find(selector, options).fetch();
    } else {
        return Songs.find({}, options).fetch();
    }
});

function buildRegExp(searchText) {
    let words, exps, fullExp;
    words = searchText.trim().split(/[ \-\:]+/);
    exps = _.map(words, function(word) {
        return "(?=.*" + word + ")";
    });
    fullExp = exps.join('') + ".+";
    return new RegExp(fullExp, "i");
}