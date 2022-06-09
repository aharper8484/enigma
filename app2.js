"use strict";

//Board and Rotors
//Index 0 to 25 (26 letters)
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const plugboard = [
  "Z",
  "P",
  "H",
  "N",
  "M",
  "S",
  "W",
  "C",
  "I",
  "Y",
  "T",
  "Q",
  "E",
  "D",
  "O",
  "B",
  "L",
  "R",
  "F",
  "K",
  "U",
  "V",
  "G",
  "X",
  "J",
  "A",
];

const reflectorA = [
  "E",
  "J",
  "M",
  "Z",
  "A",
  "L",
  "Y",
  "X",
  "V",
  "B",
  "W",
  "F",
  "C",
  "R",
  "Q",
  "U",
  "O",
  "N",
  "T",
  "S",
  "P",
  "I",
  "K",
  "H",
  "G",
  "D",
];

const reflectorB = [
  "Y",
  "R",
  "U",
  "H",
  "Q",
  "S",
  "L",
  "D",
  "P",
  "X",
  "N",
  "G",
  "O",
  "K",
  "M",
  "I",
  "E",
  "B",
  "F",
  "Z",
  "C",
  "W",
  "V",
  "J",
  "A",
  "T",
];

const fastRotorArray = [
  "E",
  "K",
  "M",
  "F",
  "L",
  "G",
  "D",
  "Q",
  "V",
  "Z",
  "N",
  "T",
  "O",
  "W",
  "Y",
  "H",
  "X",
  "U",
  "S",
  "P",
  "A",
  "I",
  "B",
  "R",
  "C",
  "J",
];

const mediumRotorArray = [
  "A",
  "J",
  "D",
  "K",
  "S",
  "I",
  "R",
  "U",
  "X",
  "B",
  "L",
  "H",
  "W",
  "T",
  "M",
  "C",
  "Q",
  "G",
  "Z",
  "N",
  "P",
  "Y",
  "F",
  "V",
  "O",
  "E",
];

const slowRotorArray = [
  "B",
  "D",
  "F",
  "H",
  "J",
  "L",
  "C",
  "P",
  "R",
  "T",
  "X",
  "V",
  "Z",
  "N",
  "Y",
  "E",
  "I",
  "W",
  "G",
  "A",
  "K",
  "M",
  "U",
  "S",
  "Q",
  "O",
];

function encrypt() {
  //substitution function
  function substitute(inputArray, inputValue, subArray) {
    let index = inputArray.indexOf(inputValue);
    return subArray[index];
  }

  //empty variable to select Reflector
  let reflectorArray;

  //user value retrieved from HTML - function to store choice in reflector Array variable
  let reflectorChoice = document.getElementById("reflector").value;
  if (reflectorChoice == "A") {
    reflectorArray = reflectorA;
  } else {
    reflectorArray = reflectorB;
  }

  const Rotor = function (letters, offset, count, state) {
    this.letters = letters;
    this.offset = offset;
    this.count = count;
    this.state = function () {
      (this.count + this.offset) % 25;
    };
  };

  const fastRotor = new Rotor(
    fastRotorArray,
    document.getElementById("r1").value,
    0
  );
  console.log(fastRotor);

  const mediumRotor = new Rotor(
    mediumRotorArray,
    document.getElementById("r2").value,
    0
  );

  const slowRotor = new Rotor(
    slowRotorArray,
    document.getElementById("r3").value,
    0
  );
}
