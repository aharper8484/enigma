//array of regular alphabet - index 0 to 25 (26 letters)
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

//array of plugboard - index 0 to 25
const plugboard = [
  "Z",
  "P",
  "H",
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

//array of rotors
const fastRotor = [
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

const mediumRotor = [
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

const slowRotor = [
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

//reflector array
const reflector = [
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

// retrieve users message and encrypt it
function getMessage() {
  //variables containing rotor positions
  let fastRotorOffset = 0;
  let mediumRotorOffset = 0;
  let slowRotorOffset = 0;

  //empty variable to add encrypted letters to
  let encryptedMsg = "";

  //function to retrieve text, remove space + non-letter characters and convert to uppercase
  var userInput = document
    .getElementById("cypherInput")
    .value.replace(/\s+/g, "")
    .toUpperCase();

  //loop through each letter of the message/user input
  for (let i = 0; i < userInput.length; i++) {
    //plugboard Outbound
    //get index of letter form alphabet and store in variable
    let plugboardInputIndex = alphabet.indexOf(userInput[i]);
    //substitute letter with plugboard array
    let plugboardOutput = plugboard[plugboardInputIndex];

    // sample messages
    // hwjefmcwltfnsnselrfdnwoehwjefmcwltfnsnselrfdnwoehwjefmcwltfnsnselrfdnwoe
    // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

    //fast rotor substitute
    //get index of the plugboard array
    let fastRotorOut = plugboard.indexOf(plugboardOutput);
    //substitute letter with fast rotor array
    //include offset
    fastRotorOut = (fastRotorOut + fastRotorOffset) % 26;
    let fastRotorNewLetter = fastRotor[fastRotorOut];
    let fastRotorNewIndex = fastRotor.indexOf(fastRotorNewLetter);
    fastRotorNewIndex = (fastRotorNewIndex - fastRotorOffset + 26) % 26;
    fastRotorOffset++;

    //rotor2 sub and rotate
    let mediumRotorOut = fastRotor.indexOf(fastRotorNewLetter);
    mediumRotorOut = (mediumRotorOut + mediumRotorOffset) % 26;
    let mediumRotorNewLetter = mediumRotor[mediumRotorOut];
    let mediumRotorNewIndex = mediumRotor.indexOf(mediumRotorNewLetter);
    mediumRotorNewIndex = (mediumRotorNewIndex - mediumRotorOffset + 26) % 26;
    if (fastRotorOffset > 0 && fastRotorOffset % 26 == 0) {
      mediumRotorOffset++;
    }

    //rotor3 sub and rotate
    let slowRotorOut = mediumRotor.indexOf(mediumRotorNewLetter);
    slowRotorOut = (slowRotorOut + slowRotorOffset) % 26;
    let slowRotorNewLetter = slowRotor[slowRotorOut];
    let slowRotorNewIndex = slowRotor.indexOf(slowRotorNewLetter);
    slowRotorNewIndex = (slowRotorNewIndex - slowRotorOffset + 26) % 26;
    if (mediumRotorOffset > 0 && mediumRotorOffset % 26 == 0) {
      slowRotorOffset++;
    }

    //reflector substitution
    let reflectorInputIndex = slowRotor.indexOf(slowRotorNewLetter);
    //substitute letter with reflector array
    let reflectorNewLetter = reflector[reflectorInputIndex];

    //rotor3-substitute only
    let slowRotorReturnIndex = reflector.indexOf(reflectorNewLetter);
    let slowRotorReturnLetter = slowRotor[slowRotorReturnIndex];

    //rotor2-substitute only
    let mediumRotorReturnIndex = slowRotor.indexOf(slowRotorReturnLetter);
    let mediumRotorReturnLetter = mediumRotor[mediumRotorReturnIndex];

    //rotor1-substitute only
    let fastRotorReturnIndex = mediumRotor.indexOf(mediumRotorReturnLetter);
    let fastRotorReturnLetter = fastRotor[fastRotorReturnIndex];

    //plugboard
    let PlugboardReturnIndex = fastRotor.indexOf(fastRotorReturnLetter);
    let cypherLetter = plugboard[PlugboardReturnIndex];

    //push resulting letter to cypherOutput
    encryptedMsg = encryptedMsg + cypherLetter;
    console.log(i + " letter " + cypherLetter);
  }
  return (document.getElementById("cypher").innerHTML = encryptedMsg);
}

//push encryptedMsg onto index.html
