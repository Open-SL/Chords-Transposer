# Chords Transposer #

Easily transpose chords from a one scale to another scale

using chords.js file you can parse a raw text into chords and song lines, transpose song from this scale to given scale or from a required numbers of semitones.

use
```
<script src="lib/chords.js"></script>
```
to add chords.js file into html page

## Exposed Functions
```javascript
  shiftScale(src, from, to);
  shiftScaleBy(src, val);
  parse(src);
```

## Examples ##
```javascript

function shift(src_id, dst_id, from, to) {
    val = 0;
    var src = document.getElementById(src_id);
    var dst = document.getElementById(dst_id);
    dst.innerHTML = chords.shiftScale(src, from, to); //returns a string
}

function shiftPlus(src_id, dst_id) {
    val += 1;
    var src = document.getElementById(src_id);
    var dst = document.getElementById(dst_id);
    dst.innerHTML = chords.shiftScaleBy(src, val); //returns a string
}

function shiftMinus(src_id, dst_id) {
    val -= 1;
    var src = document.getElementById(src_id);
    var dst = document.getElementById(dst_id);
    dst.innerHTML = chords.shiftScaleBy(src, val); //returns a string
}

function parse(src_id, dst_id) {
    val = 0;
    var src = document.getElementById(src_id);
    var dst = document.getElementById(dst_id);
    dst.innerHTML = chords.parse(src); //returns a string
}
```

Contributions are welcome for,

- [X] Transpose scale from one to another
- [X] Fix Problem with flat and sharp signs
- [X] Function to go transpose up and down in scales
- [ ] Fix parsing error in more complex strings (strings with | and - signs)
