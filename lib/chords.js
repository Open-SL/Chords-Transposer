var chords = function() {};

var _chords = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var _chordsFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

chords.parse = function(src) {
    // parse a text with chords and highlight guitar chords
    var src_textArray = src.value.split(/\r\n|\r|\n/g);
    for (var i = 0; i < src_textArray.length; i++) {
        src_textArray[i] = replaceWithTags(findChords(src_textArray[i]), src_textArray[i]);
    }
    return array2string(src_textArray);
};

chords.shiftScale = function(src, key, change_key) {
    // when the key is given scale shifting to given scale
    var index = _chords.indexOf(key);
    var changeIndex = _chords.indexOf(change_key);
    var val = changeIndex - index;
    var src_textArray = src.value.split(/\r\n|\r|\n/g);
    for (var i = 0; i < src_textArray.length; i++) {
        src_textArray[i] = transposition(findChords(src_textArray[i]), src_textArray[i], val);
    }
    return array2string(src_textArray);
}

chords.shiftScaleBy = function(src, shiftBy) {
    // shift scale from tones and semitones 1 unit = 1 semitone | 2 units = 1 tone
    // + and - can be used to travel through the scale
    var val = shiftBy;
    var src_textArray = src.value.split(/\r\n|\r|\n/g);
    for (var i = 0; i < src_textArray.length; i++) {
        src_textArray[i] = transposition(findChords(src_textArray[i]), src_textArray[i], val);
    }
    return array2string(src_textArray);
}

function transposition(_array, line, change) {
    //need to add <div class="chords-highlighted">.....</div> into code
    var val = 0;
    var firstString = '<span class="chords-highlighted">';
    var secondString = '</span>';
    var chordsArray = [];
    _array.forEach(function(value, i) {
        var originalVal = value;
        console.log(originalVal);
        console.log('%d: %s', i, value);
        value = value.replace(/m?(sus|add|maj)?[0-9]?( *(-|\/))? *$/, '');
        console.log(value);
        if (_chords.indexOf(value) < 0) {
            chordsArray = _chordsFlat;
        } else {
            chordsArray = _chords;
        }
        var index_chord = chordsArray.indexOf(value);

        if (change < 0) {
            if (index_chord + change < 0) {
                var newValue = chordsArray[(chordsArray.length + index_chord + change) % chordsArray.length];
            } else {
                var newValue = chordsArray[(index_chord + change) % chordsArray.length];
            }
        } else {
            var newValue = chordsArray[(index_chord + change) % chordsArray.length];
        }
        console.log(value);
        console.log(newValue);
        var lngt = (newValue.length - value.length);
        console.log(lngt);
        line = line.slice(0, i + val) + firstString + newValue + line.slice(i + val + value.length, i + val + originalVal.length) + secondString + line.slice(i + val + originalVal.length);
        console.log(line);
        val += firstString.length + secondString.length + lngt;

    });
    return line;
}

function array2string(array) {
    var string = '';
    array.forEach(function(value, i) {
        string += value + '\n';
    });
    return string;
}

function findChords(line) {
    var line = line.replace(/\|/g, " ").replace(/\t/g, " ").replace(/\-/g, " ");
    var reg = /^ *[A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b)?)?( +[A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *)* *$/,
        reguniq = /[A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *$/,
        i,
        tab;

    if (String(line).match(reg)) {
        i = line.search(reguniq);
        tab = findChords(line.substr(0, i - 1));
        tab[i] = line.substr(i).trim();
        return tab;
    }
    return [];
};

function replaceWithTags(_array, line) {
    //need to add <div class="chords-highlighted">.....</div> into code
    var val = 0;
    var firstString = '<span class="chords-highlighted">';
    var secondString = '</span>';
    _array.forEach(function(value, i) {
        console.log('%d: %s', i, value);
        line = line.slice(0, i + val) + firstString + line.slice(i + val, i + val + value.length) + secondString + line.slice(i + val + value.length);
        val += firstString.length + secondString.length;
    });
    return line;
}
