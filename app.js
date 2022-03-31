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

const rotor1 = [
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

const rotor2 = [
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

const rotor3 = [
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

let rotor1Count = 0;
let rotor2Count = 0;
let rotor3Count = 0;

// retrieve users message and encrypt it
function getMessage() {
  //empty variable to add encrypted letters to
  let encryptedMsg = "";

  var userInput = document.getElementById("cypherInput").value.toUpperCase();
  for (let i = 0; i < userInput.length; i++) {
    //plugboard
    let plugOut = alphabet.indexOf(userInput[i]);
    let plugOutSub = plugboard[plugOut];

    //rotor1 sub
    let rotor1Out = plugboard.indexOf(plugOutSub);
    let rotor1OutSub = rotor1[rotor1Out + (rotor1Count % 26)];
    //rotor1 rotate
    rotor1Count++;

    //rotor2 sub
    let rotor2Out = rotor1.indexOf(rotor1OutSub);
    let rotor2OutSub = rotor2[rotor2Out + (rotor2Count % 26)];
    //rotor2 rotate
    if (rotor1Count > 0 && rotor1Count % 26 == 0) {
      rotor2Count++;
    }

    console.log(
      // "User input: " +
      //   userInput[i] +
      //   ", Plug Sub: " +
      //   plugOutSub +
      ", R1 count: " +
        rotor1Count +
        ", R1 Sub: " +
        rotor1OutSub +
        ", R2 count: " +
        rotor2Count +
        ", R2 Sub: " +
        rotor2OutSub +
        rotor2Out
    );
  }

  //    {
  //     //plugboard
  //     substitution(cypherInput[i], plugboard);
  //     console.log(subResult);
  //rotor1
  //rotor2
  //rotor3
  //reflector
  //rotor3-substitute only
  //rotor2-substitute only
  //rotor1-substitute only
  //plugboard
  //push resulting letter to cypherOutput
  //     }

  //     return encryptedMsg;
  //   }
}

//push encryptedMsg onto index.html
