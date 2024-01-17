type Chord = {
  chord: string;
  position: number;
};

// prettier-ignore
const chordsArrangement = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
// prettier-ignore
const chordsArrangementFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

export class Transpose {
  private chords: Chord[];
  private song: string;

  constructor(song: string) {
    this.chords = this.parse(song);
    this.song = song;
  }

  private findChords(line: string, offset: number): Chord[] {
    const modifiedLine = line
      .replace(/\||\t|\-|\/|\(|\)|\,|\s/g, " ")
      .replace(/[\[\]']+/g, " ")
      .trim();

    const reg =
      /^ *[A-Ga-g](#|b|&)?m?\+?(sus|add|maj|dim|aug)?[0-9]?( *(-|\/) *[A-G](#|b)?)?( +[A-Ga-g](#|b|&)?m?\+?(sus|add|maj|dim|aug)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *)* *$/g;
    const reguniq =
      /[A-Ga-g](#|b|&)?m?\+?(sus|add|maj|dim|aug)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? */g;

    if (!modifiedLine.match(reg)) {
      return [];
    }

    const chordsWithPositions = [];

    let match;
    while ((match = reguniq.exec(line)) !== null) {
      chordsWithPositions.push({
        chord: match[0].trim(), // Trim to remove leading/trailing spaces
        position: match.index + offset
      });
    }

    return chordsWithPositions;
  }

  private parse(src: string): Chord[] {
    // Parse a text with chords and highlight guitar chords
    const src_textArray = src.split(/\r\n|\r|\n/g);
    let offset = 0;
    const chords = [];

    // Process each line in the src_textArray
    for (let i = 0; i < src_textArray.length; i++) {
      chords.push(...this.findChords(src_textArray[i], offset));
      offset += src_textArray[i].length + 1;
    }

    return chords;
  }

  getWithTags(): string {
    // Add '<span class="chords-highlighted">...</span>' into the code
    let offset = 0;
    const firstString = '<span class="chords-highlighted">';
    const secondString = "</span>";
    let updatedSong = this.song;

    this.chords.forEach((value: Chord) => {
      const index = value.position + offset; // Apply offset

      let start = index;
      while (start < updatedSong.length && !updatedSong[start].match(/\s/)) {
        start++;
      }

      // Calculate the position to insert the tags
      updatedSong =
        updatedSong.slice(0, index) +
        firstString +
        value.chord +
        secondString +
        updatedSong.slice(start);

      // Update the position for the next iteration
      offset +=
        firstString.length +
        secondString.length +
        value.chord.length -
        (start - index);
    });

    return updatedSong;
  }

  private shiftScale(shiftBy: number): Chord[] {
    let refArrangement: string[] | null = null;
    const updatedChords = this.chords.map((chord) => {
      if (refArrangement === null) {
        refArrangement =
          chordsArrangement.indexOf(chord.chord) !== -1
            ? chordsArrangement
            : chordsArrangementFlat;
      }

      // check if the chord is a minor chord
      let searchKey = chord.chord;
      let isMinor = false;
      if (chord.chord[chord.chord.length - 1] === "m") {
        searchKey = chord.chord.slice(0, chord.chord.length - 1);
        isMinor = true;
      }

      const currentIndex = refArrangement.indexOf(searchKey);

      let finalPosition = currentIndex + shiftBy;

      if (finalPosition < 0) {
        finalPosition =
          (refArrangement.length + finalPosition) % refArrangement.length;
      } else {
        finalPosition %= refArrangement.length;
      }

      return {
        chord: `${refArrangement[finalPosition]}${isMinor ? "m" : ""}`,
        position: chord.position
      };
    });

    return updatedChords;
  }

  shiftScaleBy(shiftBy: number): this {
    this.chords = this.shiftScale(shiftBy);

    return this;
  }

  shiftScaleFromTo(from: string, to: string): this {
    const arrangement =
      chordsArrangement.indexOf(from) !== -1 &&
      chordsArrangement.indexOf(to) !== -1
        ? chordsArrangement
        : chordsArrangementFlat;
    const diff = arrangement.indexOf(to) - arrangement.indexOf(from);

    this.chords = this.shiftScale(diff);

    return this;
  }
}

export default Transpose;
