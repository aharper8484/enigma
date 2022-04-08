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
  //Retrieve user value of Rotor Offset from HTML - default 0
  let fastRotorOffset = document.getElementById("r1").value;
  //Counter Start value
  let fastCount = 0;
  //Variable to store count and offset
  let fastCountStart = fastCount + fastRotorOffset;

  //as above for Medium rotor
  let mediumRotorOffset = document.getElementById("r2").value;
  let mediumCount = 0;
  let mediumCountStart = mediumCount + mediumRotorOffset;

  //as above for Slow rotor
  let slowRotorOffset = document.getElementById("r3").value;
  let slowCount = 0;
  let slowcountStart = slowCount + slowRotorOffset;

  //empty variable to select Reflector
  let reflectorArray;

  //user value retrieved from HTML - function to store choice in reflector Array variable
  let reflectorChoice = document.getElementById("reflector").value;
  if (reflectorChoice == "A") {
    reflectorArray = reflectorA;
  } else {
    reflectorArray = reflectorB;
  }

  //empty string variable to push encrypted letter into to form message
  let encryptedMsg = "";

  //function to retrieve text, remove space + non-letter characters and convert to uppercase
  var userInput = document
    .getElementById("encryption")
    .value.replace(/\s+/g, "")
    .toUpperCase();

  //loop through each letter of the message/user input
  for (let i = 0; i < userInput.length; i++) {
    //plugboard Outbound
    //get index of letter from alphabet and store in variable
    let plugboardInputIndex = alphabet.indexOf(userInput[i]);
    //substitute letter with plugboard array
    let plugboardOutput = plugboard[plugboardInputIndex];

    //fast rotor substitute
    //get index of the plugboard array
    let fastRotorOut = plugboard.indexOf(plugboardOutput);
    //substitute letter with fast rotor array
    //include offset and ensure value is between 0-25
    fastRotorOut = (fastRotorOut + fastRotorOffset) % 26;
    //obtain new letter from Fast Rotor
    let fastRotorNewLetter = fastRotor[fastRotorOut];
    //obtain index from Fast Rotor with new letter
    let fastRotorNewIndex = fastRotor.indexOf(fastRotorNewLetter);
    fastRotorNewIndex = (fastRotorNewIndex - fastRotorOffset + 26) % 26;
    //rotate/increment Fast rotor - **every time outbound**
    fastCount++;

    //medium rotor - substitute and rotate
    //same as fast rotor **except for rotate function**
    let mediumRotorOut = fastRotor.indexOf(fastRotorNewLetter);
    mediumRotorOut = (mediumRotorOut + mediumRotorOffset) % 26;
    let mediumRotorNewLetter = mediumRotor[mediumRotorOut];
    let mediumRotorNewIndex = mediumRotor.indexOf(mediumRotorNewLetter);
    mediumRotorNewIndex = (mediumRotorNewIndex - mediumRotorOffset + 26) % 26;
    //only rotates when fast count has completed full rotation - 26 times
    //two conditions included to ensure medium count doesn't increment on first pass
    if (fastCount > 0 && (fastCount - fastCountStart) % 26 == 0) {
      mediumCount++;
    }

    //rotor3 sub and rotate
    //same as medium rotor but rotation occurs on full rotation of medium rotor
    let slowRotorOut = mediumRotor.indexOf(mediumRotorNewLetter);
    slowRotorOut = (slowRotorOut + slowRotorOffset) % 26;
    let slowRotorNewLetter = slowRotor[slowRotorOut];
    let slowRotorNewIndex = slowRotor.indexOf(slowRotorNewLetter);
    slowRotorNewIndex = (slowRotorNewIndex - slowRotorOffset + 26) % 26;
    if (mediumCount > 0 && fastCount % 676 == 0) {
      slowCount++;
    }

    //reflector substitution - takes index from slow rotor
    //uses the array variable from user input - reflectorArray
    let reflectorInputIndex = slowRotor.indexOf(slowRotorNewLetter);
    let reflectorNewLetter = reflectorArray[reflectorInputIndex];

    //return journey - substitutions only - slow rotor
    let slowRotorReturnIndex = reflectorArray.indexOf(reflectorNewLetter);
    let slowRotorReturnLetter = slowRotor[slowRotorReturnIndex];

    //substitution - medium rotor
    let mediumRotorReturnIndex = slowRotor.indexOf(slowRotorReturnLetter);
    let mediumRotorReturnLetter = mediumRotor[mediumRotorReturnIndex];

    //substitution - slow rotor
    let fastRotorReturnIndex = mediumRotor.indexOf(mediumRotorReturnLetter);
    let fastRotorReturnLetter = fastRotor[fastRotorReturnIndex];

    //plugboard substitution
    let plugboardReturnIndex = fastRotor.indexOf(fastRotorReturnLetter);
    let plugboardReturnLetter = plugboard[plugboardReturnIndex];

    //sub back to alphabet
    cypherIndex = plugboard.indexOf(plugboardReturnLetter);
    cypherLetter = alphabet[cypherIndex];

    //push resulting letter to cypherOutput
    encryptedMsg = encryptedMsg + cypherLetter;
  }
  //push encrypted message and rotor counts to HTML using ID tags
  return (
    (document.getElementById("messageE").innerHTML = encryptedMsg) +
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

  //same as encryption - empty variable to store users choice of reflector
  let reflectorArray;
  let reflectorChoice = document.getElementById("reflector").value;
  if (reflectorChoice === "A") {
    reflectorArray = reflectorA;
  } else {
    reflectorArray = reflectorB;
  }

  //variables containing rotor positions
  //Variable will be counting backwards so taking final values
  let fastRotorOffset = document.getElementById("r1").value;
  //fast rotor always rotates so will be same as the message length
  let fastCountStart = userInput.length;
  let fastCount = fastCountStart;
  let mediumRotorOffset = document.getElementById("r2").value;
  //medium rotor will rotate every 26 rotations of the fast rotor
  let mediumCountStart = Math.floor(fastCountStart / 26);
  let mediumCount = mediumCountStart;
  //slow rotor will rotate every 26 rotation of the medium rotor
  let slowRotorOffset = document.getElementById("r3").value;
  let slowcountStart = Math.floor(mediumCountStart / 26);
  let slowCount = slowcountStart;

  //empty variable to add encrypted letters to
  let decryptedMsg = "";

  //loop through each letter of the message/user input
  //**loops backwards through the message**/
  for (let i = userInput.length - 1; i >= 0; i--) {
    //plugboard Outbound
    //get index of letter form alphabet and store in variable
    let plugboardInputIndex = alphabet.indexOf(userInput[i]);
    //substitute letter with plugboard array
    let plugboardOutput = plugboard[plugboardInputIndex];

    //fast rotor - SUB only - rotates backwards on return
    //get index of the plugboard array
    let fastRotorOut = plugboard.indexOf(plugboardOutput);
    //substitute letter with fast rotor array
    //include offset and number of rotations
    fastRotorOut = (fastRotorOut + fastCount + fastRotorOffset) % 26;
    let fastRotorNewLetter = fastRotor[fastRotorOut];

    //medium rotor - SUB only - same as above
    let mediumRotorOut = fastRotor.indexOf(fastRotorNewLetter);
    mediumRotorOut = (mediumRotorOut + mediumCount + mediumRotorOffset) % 26;
    let mediumRotorNewLetter = mediumRotor[mediumRotorOut];

    //slow rotor - SUB only - same as above
    let slowRotorOut = mediumRotor.indexOf(mediumRotorNewLetter);
    slowRotorOut = (slowRotorOut + slowCount + slowRotorOffset) % 26;
    let slowRotorNewLetter = slowRotor[slowRotorOut];

    //reflector substitution using user choice
    let reflectorInputIndex = slowRotor.indexOf(slowRotorNewLetter);
    let reflectorNewLetter = reflectorArray[reflectorInputIndex];

    //slow rotor - rotate then substitute
    //reverse of encryption
    if (
      mediumRotorOffset > 0 &&
      (mediumRotorOffset - mediumCountStart) % 26 == 0
    ) {
      //counting down
      slowCount--;
    }
    //subtitution of slow rotor
    let slowRotorReturnIndex = reflectorArray.indexOf(reflectorNewLetter);
    let slowRotorReturnLetter = slowRotor[slowRotorReturnIndex];
    let slowRotorNewIndex = slowRotor.indexOf(slowRotorReturnLetter);
    slowRotorNewIndex = (slowRotorNewIndex - slowRotorOffset + 26) % 26;

    //medium rotor - rotate then subtitute - as above
    if (fastRotorOffset > 0 && (fastRotorOffset - fastCountStart) % 26 == 0) {
      mediumCount--;
    }
    let mediumRotorReturnIndex = slowRotor.indexOf(slowRotorReturnLetter);
    let mediumRotorReturnLetter = mediumRotor[mediumRotorReturnIndex];
    let mediumRotorNewIndex = mediumRotor.indexOf(mediumRotorReturnLetter);
    mediumRotorNewIndex = (mediumRotorNewIndex - mediumRotorOffset + 26) % 26;

    //fast rotor - sub and rotate - as above but always rotates, backwards
    fastCount--;
    let fastRotorReturnIndex = mediumRotor.indexOf(mediumRotorReturnLetter);
    let fastRotorReturnLetter = fastRotor[fastRotorReturnIndex];
    let fastRotorNewIndex = fastRotor.indexOf(fastRotorNewLetter);
    fastRotorNewIndex = (fastRotorNewIndex - fastRotorOffset + 26) % 26;

    //plugboard substitution
    let plugboardReturnIndex = fastRotor.indexOf(fastRotorReturnLetter);
    let plugboardSubLetter = plugboard[plugboardReturnIndex];

    //sub back into alphabet array
    let alphabetIndex = plugboard.indexOf(plugboardSubLetter);
    let cypherLetter = alphabet[alphabetIndex];

    //push resulting letter to cypherOutput
    decryptedMsg = decryptedMsg + cypherLetter;
  }

  //push the decrypted message and rotor counts to HTML
  return (
    (document.getElementById("messageD").innerHTML = decryptedMsg
      .split("")
      .reverse()
      .join("")) +
    (document.getElementById("r1d").innerHTML = fastCountStart) +
    (document.getElementById("r2d").innerHTML = mediumCountStart) +
    (document.getElementById("r3d").innerHTML = slowcountStart)
  );
}
