//CONSTANT VARIABLES
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

//array of plugboard letters - index 0 to 25
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

//array of rotors
//fast rotor - aka rotor1
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

//medium rotor - aka rotor2
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

//fast rotor - aka rotor3
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

//reflector arrays
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

//ENCRYPTION FUNCTION
// retrieve users message and encrypt it
function encrypt() {
  //variables containing rotor positions
  let fastRotorOffset = document.getElementById("r1").value;
  let fastCount = 0;
  let fastCountStart = fastCount + fastRotorOffset;
  let mediumRotorOffset = document.getElementById("r2").value;
  let mediumCount = 0;
  let mediumCountStart = mediumCount + mediumRotorOffset;
  let slowRotorOffset = document.getElementById("r3").value;
  let slowCount = 0;
  let slowcountStart = slowCount + slowRotorOffset;
  let reflectorArray;

  let reflectorChoice = document.getElementById("reflector").value;
  if (reflectorChoice == "A") {
    reflectorArray = reflectorA;
  } else {
    reflectorArray = reflectorB;
  }

  //empty variable to add encrypted letters to
  let encryptedMsg = "";

  //function to retrieve text, remove space + non-letter characters and convert to uppercase
  var userInput = document
    .getElementById("encryption")
    .value.replace(/\s+/g, "")
    .toUpperCase();

  //loop through each letter of the message/user input
  for (let i = 0; i < userInput.length; i++) {
    //plugboard Outbound
    //get index of letter form alphabet and store in variable
    let plugboardInputIndex = alphabet.indexOf(userInput[i]);
    //substitute letter with plugboard array
    let plugboardOutput = plugboard[plugboardInputIndex];

    //fast rotor substitute
    //get index of the plugboard array
    let fastRotorOut = plugboard.indexOf(plugboardOutput);
    //substitute letter with fast rotor array
    //include offset
    fastRotorOut = (fastRotorOut + fastRotorOffset) % 26;
    let fastRotorNewLetter = fastRotor[fastRotorOut];
    let fastRotorNewIndex = fastRotor.indexOf(fastRotorNewLetter);
    fastRotorNewIndex = (fastRotorNewIndex - fastRotorOffset + 26) % 26;
    fastCount++;

    //rotor2 sub and rotate
    let mediumRotorOut = fastRotor.indexOf(fastRotorNewLetter);
    mediumRotorOut = (mediumRotorOut + mediumRotorOffset) % 26;
    let mediumRotorNewLetter = mediumRotor[mediumRotorOut];
    let mediumRotorNewIndex = mediumRotor.indexOf(mediumRotorNewLetter);
    mediumRotorNewIndex = (mediumRotorNewIndex - mediumRotorOffset + 26) % 26;
    if (fastCount > 0 && (fastCount - fastCountStart) % 26 == 0) {
      mediumCount++;
    }

    //rotor3 sub and rotate
    let slowRotorOut = mediumRotor.indexOf(mediumRotorNewLetter);
    slowRotorOut = (slowRotorOut + slowRotorOffset) % 26;
    let slowRotorNewLetter = slowRotor[slowRotorOut];
    let slowRotorNewIndex = slowRotor.indexOf(slowRotorNewLetter);
    slowRotorNewIndex = (slowRotorNewIndex - slowRotorOffset + 26) % 26;
    if (mediumCount > 0 && fastCount % 676 == 0) {
      slowCount++;
    }

    //reflector substitution
    let reflectorInputIndex = slowRotor.indexOf(slowRotorNewLetter);
    //substitute letter with reflector array *REFLECTOR*
    let reflectorNewLetter = reflectorArray[reflectorInputIndex];

    //rotor3-substitute only *REFLECTOR*
    let slowRotorReturnIndex = reflectorArray.indexOf(reflectorNewLetter);
    let slowRotorReturnLetter = slowRotor[slowRotorReturnIndex];

    //rotor2-substitute only
    let mediumRotorReturnIndex = slowRotor.indexOf(slowRotorReturnLetter);
    let mediumRotorReturnLetter = mediumRotor[mediumRotorReturnIndex];

    //rotor1-substitute only
    let fastRotorReturnIndex = mediumRotor.indexOf(mediumRotorReturnLetter);
    let fastRotorReturnLetter = fastRotor[fastRotorReturnIndex];

    //plugboard
    let plugboardReturnIndex = fastRotor.indexOf(fastRotorReturnLetter);
    let cypherLetter = plugboard[plugboardReturnIndex];

    //push resulting letter to cypherOutput
    encryptedMsg = encryptedMsg + cypherLetter;
  }
  return (
    (document.getElementById("message").innerHTML = encryptedMsg) +
    (document.getElementById("r1e").innerHTML = fastCount) +
    (document.getElementById("r2e").innerHTML = mediumCount) +
    (document.getElementById("r3e").innerHTML = slowCount)
  );
}

function decrypt() {
  //function to retrieve text, remove space + non-letter characters and convert to uppercase
  var userInput = document
    .getElementById("cypherInput")
    .value.replace(/\s+/g, "")
    .toUpperCase();

  let reflectorArray;
  let reflectorChoice = document.getElementById("reflector").value;
  if (reflectorChoice === "A") {
    reflectorArray = reflectorA;
  } else {
    reflectorArray = reflectorB;
  }

  //variables containing rotor positions
  let fastRotorOffset = document.getElementById("r1").value;
  let fastCountStart = userInput.length;
  let fastCount = fastCountStart;
  let mediumRotorOffset = document.getElementById("r2").value;
  let mediumCountStart = Math.floor(fastCountStart / 26);
  let mediumCount = mediumCountStart;
  let slowRotorOffset = document.getElementById("r3").value;
  let slowcountStart = Math.floor(mediumCountStart / 26);
  let slowCount = slowcountStart;

  //empty variable to add encrypted letters to
  let decryptedMsg = "";

  //loop through each letter of the message/user input
  for (let i = userInput.length - 1; i >= 0; i--) {
    //plugboard Outbound
    //get index of letter form alphabet and store in variable
    let plugboardInputIndex = alphabet.indexOf(userInput[i]);
    //substitute letter with plugboard array
    let plugboardOutput = plugboard[plugboardInputIndex];

    //fast rotor substitute
    //get index of the plugboard array
    let fastRotorOut = plugboard.indexOf(plugboardOutput);
    //substitute letter with fast rotor array
    //include offset
    fastRotorOut = (fastRotorOut + fastCount + fastRotorOffset) % 26;
    let fastRotorNewLetter = fastRotor[fastRotorOut];

    //rotor2 sub
    let mediumRotorOut = fastRotor.indexOf(fastRotorNewLetter);
    mediumRotorOut = (mediumRotorOut + mediumCount + mediumRotorOffset) % 26;
    let mediumRotorNewLetter = mediumRotor[mediumRotorOut];

    //rotor3 sub
    let slowRotorOut = mediumRotor.indexOf(mediumRotorNewLetter);
    slowRotorOut = (slowRotorOut + slowCount + slowRotorOffset) % 26;
    let slowRotorNewLetter = slowRotor[slowRotorOut];

    //reflector substitution
    let reflectorInputIndex = slowRotor.indexOf(slowRotorNewLetter);
    //substitute letter with reflector array *REFLECTOR*
    let reflectorNewLetter = reflectorArray[reflectorInputIndex];

    //rotor3-rotate and sub
    //rotor3 rotate
    if (
      mediumRotorOffset > 0 &&
      (mediumRotorOffset - mediumCountStart) % 26 == 0
    ) {
      slowCount--;
    }
    //sub
    let slowRotorReturnIndex = reflectorArray.indexOf(reflectorNewLetter);
    let slowRotorReturnLetter = slowRotor[slowRotorReturnIndex];
    let slowRotorNewIndex = slowRotor.indexOf(slowRotorReturnLetter);
    slowRotorNewIndex = (slowRotorNewIndex - slowRotorOffset + 26) % 26;

    //rotor2 rotate then sub
    //rotor2 rotate
    if (fastRotorOffset > 0 && (fastRotorOffset - fastCountStart) % 26 == 0) {
      mediumCount--;
    }
    //sub
    let mediumRotorReturnIndex = slowRotor.indexOf(slowRotorReturnLetter);
    let mediumRotorReturnLetter = mediumRotor[mediumRotorReturnIndex];

    let mediumRotorNewIndex = mediumRotor.indexOf(mediumRotorReturnLetter);
    mediumRotorNewIndex = (mediumRotorNewIndex - mediumRotorOffset + 26) % 26;

    //rotor1-sub and rotate
    //rotor1 rotate
    fastCount--;
    //sub
    let fastRotorReturnIndex = mediumRotor.indexOf(mediumRotorReturnLetter);
    let fastRotorReturnLetter = fastRotor[fastRotorReturnIndex];
    let fastRotorNewIndex = fastRotor.indexOf(fastRotorNewLetter);
    fastRotorNewIndex = (fastRotorNewIndex - fastRotorOffset + 26) % 26;

    //plugboard
    let plugboardReturnIndex = fastRotor.indexOf(fastRotorReturnLetter);
    let plugboardSubLetter = plugboard[plugboardReturnIndex];

    let alphabetIndex = plugboard.indexOf(plugboardSubLetter);
    let cypherLetter = alphabet[alphabetIndex];

    //push resulting letter to cypherOutput
    decryptedMsg = decryptedMsg + cypherLetter;
  }

  return (
    (document.getElementById("message").innerHTML = decryptedMsg
      .split("")
      .reverse()
      .join("")) +
    (document.getElementById("r1d").innerHTML = fastCountStart) +
    (document.getElementById("r2d").innerHTML = mediumCountStart) +
    (document.getElementById("r3d").innerHTML = slowcountStart)
  );
}

//push encryptedMsg onto index.html
