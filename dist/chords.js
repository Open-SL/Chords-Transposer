function transposition(n, r, s) {
  var e = 0,
    o = '<span class="chords-highlighted">',
    a = "</span>",
    t = [];
  return n.forEach(function (n, l) {
    var c = n;
    console.log(c), console.log("%d: %s", l, n), n = n.replace(/m?(sus|add|maj)?[0-9]?( *(-|\/))? *$/, ""), console.log(n), t = _chords.indexOf(n) < 0 ? _chordsFlat : _chords;
    var h = t.indexOf(n);
    if (s < 0)
      if (h + s < 0) var i = t[(t.length + h + s) % t.length];
      else var i = t[(h + s) % t.length];
    else var i = t[(h + s) % t.length];
    console.log(n), console.log(i);
    var g = i.length - n.length;
    console.log(g), r = r.slice(0, l + e) + o + i + r.slice(l + e + n.length, l + e + c.length) + a + r.slice(l + e + c.length), console.log(r), e += o.length + a.length + g
  }), r
}

function array2string(n) {
  var r = "";
  return n.forEach(function (n, s) {
    r += n + "\n"
  }), r
}

function findChords(n) {
  var r, s, n = n.replace(/\|/g, " ").replace(/\t/g, " ").replace(/\-/g, " ").replace(/[\[\]']+/g," "),
    e = /^ *[A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b)?)?( +[A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *)* *$/,
    o = /[A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *$/;
  return String(n).match(e) ? (r = n.search(o), s = findChords(n.substr(0, r - 1)), s[r] = n.substr(r).trim(), s) : []
}

function replaceWithTags(n, r) {
  var s = 0,
    e = '<span class="chords-highlighted">',
    o = "</span>";
  return n.forEach(function (n, a) {
    console.log("%d: %s", a, n), r = r.slice(0, a + s) + e + r.slice(a + s, a + s + n.length) + o + r.slice(a + s + n.length), s += e.length + o.length
  }), r
}
var chords = function () {},
  _chords = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
  _chordsFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
chords.parse = function (n) {
  for (var r = n.value.split(/\r\n|\r|\n/g), s = 0; s < r.length; s++) r[s] = replaceWithTags(findChords(r[s]), r[s]);
  return array2string(r)
}, chords.shiftScale = function (n, r, s) {
  for (var e = _chords.indexOf(r), o = _chords.indexOf(s), a = o - e, t = n.value.split(/\r\n|\r|\n/g), l = 0; l < t.length; l++) t[l] = transposition(findChords(t[l]), t[l], a);
  return array2string(t)
}, chords.shiftScaleBy = function (n, r) {
  for (var s = r, e = n.value.split(/\r\n|\r|\n/g), o = 0; o < e.length; o++) e[o] = transposition(findChords(e[o]), e[o], s);
  return array2string(e)
};
