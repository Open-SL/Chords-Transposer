# Chords Transposer

The Chord Transposer is a TypeScript/JavaScript library designed to manipulate and transpose chords within text-based songs. This library is intended for browser use and offers functionalities to parse song texts, identify chord positions, and apply transformations like transposing and highlighting chords.

## Features

- **Chord Parsing:** Parses song texts to identify and extract chords.
- **Chord Transposition:** Allows shifting chords up or down by a specified interval.
- **HTML Tag Insertion:** Supports highlighting chords by inserting HTML tags around them.

## Getting Started

Once installed, import the `chords-transposer` library into your project,

```js
import Transposer from "chords-transposer";
```

### 1. Parsing Chord Progressions

Create a Transposer object by passing the chord progression string:

```js
const song = "Gm  F    Gm Eb     B   F     B  Gm";
const transposer = new Transposer(song);
```

### 2. Getting Chords with Tags

Retrieve the chord progression with HTML span tags for styling:

```js
const chordsWithTags = transposer.getWithTags();
console.log(chordsWithTags);
```

The output will be:

```html
<span class="chords-highlighted">Gm</span>  <span class="chords-highlighted">F</span>    <span class="chords-highlighted">Gm</span> <span class="chords-highlighted">Eb</span>     <span class="chords-highlighted">B</span>   <span class="chords-highlighted">F</span>     <span class="chords-highlighted">B</span>  <span class="chords-highlighted">Gm</span>
```

### 3. Shifting Scale

Transpose the chord progression by shifting the scale:

```js
const shiftedChords = transposer.shiftScaleBy(1).getWithTags();
console.log(shiftedChords);
```

### 4. Shifting Scale From One Key to Another

Transpose the chord progression by specifying the original and target keys:

```js
const transposedChords = transposer.shiftScaleFromTo("G", "A").getWithTags();
console.log(transposedChords);
```

### 5. Complex Scale Shifting

Combine multiple scale shifts for complex transpositions:

```js
const complexTransposition = transposer.shiftScaleBy(1).shiftScaleBy(1).shiftScaleBy(1).getWithTags();
console.log(complexTransposition);
```

## API Reference

The library exposes the following main methods:

1. `constructor(song: string)`: Initializes the library with the song text.
2. `shiftScaleBy(shiftBy: number)`: Shifts chords by the specified number of semitones.
3. `shiftScaleFromTo(from: string, to: string)`: Shifts chords from a specific chord to another.
4. `getWithTags()`: Returns the updated song text with HTML tags around chords.

Refer to the library source code or documentation for more detailed API information.

## Contributing

Contributions to this library are welcome! If you encounter issues or have ideas for enhancements, feel free to create an issue or pull request on the GitHub repository.

## License
This library is licensed under the MIT License.