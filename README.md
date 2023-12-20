# Chords Transposer

The Chord Transposer is a TypeScript/JavaScript library designed to manipulate and transpose chords within text-based songs. This library is intended for browser use and offers functionalities to parse song texts, identify chord positions, and apply transformations like transposing and highlighting chords.

## Features

- **Chord Parsing:** Parses song texts to identify and extract chords.
- **Chord Transposition:** Allows shifting chords up or down by a specified interval.
- **HTML Tag Insertion:** Supports highlighting chords by inserting HTML tags around them.

## Usage

To use the Chord Transposer library in your browser-based projects, follow these steps:

TBD

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