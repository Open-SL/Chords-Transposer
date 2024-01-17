import Transposer from "../lib/index";

test("parse test", () => {
  const song = "Gm  F    Gm Eb     B   F     B  Gm";

  const songObj = new Transposer(song);
  expect(songObj.getWithTags()).toEqual(
    '<span class="chords-highlighted">Gm</span>  <span class="chords-highlighted">F</span>    <span class="chords-highlighted">Gm</span> <span class="chords-highlighted">Eb</span>     <span class="chords-highlighted">B</span>   <span class="chords-highlighted">F</span>     <span class="chords-highlighted">B</span>  <span class="chords-highlighted">Gm</span>',
  );
});

test("shiftScaleBy test", () => {
  const song = "Gm  F    Gm Eb     B   F     B  Gm";
  const songObj = new Transposer(song);

  expect(songObj.shiftScaleBy(1).getWithTags()).toEqual(
    '<span class="chords-highlighted">Abm</span>  <span class="chords-highlighted">Gb</span>    <span class="chords-highlighted">Abm</span> <span class="chords-highlighted">E</span>     <span class="chords-highlighted">C</span>   <span class="chords-highlighted">Gb</span>     <span class="chords-highlighted">C</span>  <span class="chords-highlighted">Abm</span>',
  );
});

test("shiftScaleFromTo test", () => {
  const song = "Gm  F    Gm Eb     B   F     B  Gm";

  const songObj = new Transposer(song);

  expect(songObj.shiftScaleFromTo("G", "A").getWithTags()).toEqual(
    '<span class="chords-highlighted">Am</span>  <span class="chords-highlighted">G</span>    <span class="chords-highlighted">Am</span> <span class="chords-highlighted">F</span>     <span class="chords-highlighted">Db</span>   <span class="chords-highlighted">G</span>     <span class="chords-highlighted">Db</span>  <span class="chords-highlighted">Am</span>',
  );

  expect(songObj.shiftScaleBy(-1).getWithTags()).toEqual(
    '<span class="chords-highlighted">Abm</span>  <span class="chords-highlighted">Gb</span>    <span class="chords-highlighted">Abm</span> <span class="chords-highlighted">E</span>     <span class="chords-highlighted">C</span>   <span class="chords-highlighted">Gb</span>     <span class="chords-highlighted">C</span>  <span class="chords-highlighted">Abm</span>',
  );
});

test("shiftScaleBy complex test 1", () => {
  const song = "| Gm | F | Gm | Eb |";
  const songObj = new Transposer(song);

  expect(
    songObj.shiftScaleBy(1).shiftScaleBy(1).shiftScaleBy(1).getWithTags(),
  ).toEqual(
    '| <span class="chords-highlighted">Bbm</span> | <span class="chords-highlighted">Ab</span> | <span class="chords-highlighted">Bbm</span> | <span class="chords-highlighted">Gb</span> |',
  );
});
