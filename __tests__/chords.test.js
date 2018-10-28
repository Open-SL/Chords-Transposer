const chords = require('../lib/chords.js');

test('expects simple transpose to up one semitone', () => {
  let src = `Ab           Db
  Bonda meedum kandurelle`;
  const resultToBe = `<span class=\"chords-highlighted\">A</span>           <span class=\"chords-highlighted\">D</span>
  Bonda meedum kandurelle
`;
  expect(chords.shiftScaleBy(src, 1)).toBe(resultToBe);
});

test('expects simple transpose to up 1 semitone', () => {
  let src = `A#           C#
    Bonda meedum kandurelle`;
  const resultToBe = `<span class=\"chords-highlighted\">B</span>           <span class=\"chords-highlighted\">D</span>
    Bonda meedum kandurelle\n`;
  expect(chords.shiftScaleBy(src, 1)).toBe(resultToBe);
});

test('expects simple transpose to down one semitone', () => {
  let src = `Ab           Db
    Bonda meedum kandurelle`;
  const resultToBe = `<span class=\"chords-highlighted\">G</span>           <span class=\"chords-highlighted\">C</span>
    Bonda meedum kandurelle
`;
  expect(chords.shiftScaleBy(src, -1)).toBe(resultToBe);
});

test('expects simple transpose to down 2 semitone', () => {
  let src = `Ab           Db
      Bonda meedum kandurelle`;
  const resultToBe = `<span class=\"chords-highlighted\">Gb</span>           <span class=\"chords-highlighted\">B</span>
      Bonda meedum kandurelle\n`;
  expect(chords.shiftScaleBy(src, -2)).toBe(resultToBe);
});

test('expects parser to parse and add tags', () => {
  let src = `Ab           Db
    Bonda meedum kandurelle`;
  const resultToBe = `<span class=\"chords-highlighted\">Ab</span>           <span class=\"chords-highlighted\">Db</span>
    Bonda meedum kandurelle
`;
  expect(chords.parse(src)).toBe(resultToBe);
});

test('expects shift scale from Ab -> B', () => {
  let src = `Ab           Db`;
  const resultToBe = `<span class=\"chords-highlighted\">A</span>           <span class=\"chords-highlighted\">D</span>\n`;
  expect(chords.shiftScale(src, 'G', 'G#')).toBe(resultToBe);
});
