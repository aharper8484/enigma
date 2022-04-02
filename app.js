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

// retrieve users message and encrypt it
function getMessage() {
  let rotor1Offset = 0;
  // let rotor2Offset = 0;
  // let rotor3Offset = 0;

  //empty variable to add encrypted letters to
  let encryptedMsg = "";

  //function to remove space and non-letter characters

  var userInput = document.getElementById("cypherInput").value.toUpperCase();
  for (let i = 0; i < userInput.length; i++) {
    //plugboard
    let plugOutbound = alphabet.indexOf(userInput[i]);

    let plugOutboundSub = plugboard[plugOutbound];

    //rotor1 sub
    let rotor1Outbound = plugboard.indexOf(plugOutboundSub);
    let rotor1OutSub = rotor1[rotor1Outbound + (rotor1Offset % 26)];
    //rotor1 rotate
    // if (rotor1Offset === 25) {
    //   rotor1Offset = 0;
    // } else {
    //   rotor1Offset++;
    // }
    rotor1Offset++;

    if (rotor1Offset > 0 && rotor1Offset % 26 == 0) {
      rotor2Offset++;
    }

    //rotor2 sub
    // let rotor2Outbound = rotor1.indexOf(rotor1OutSub);
    // let rotor2OutSub = rotor2[rotor2Outbound + (rotor2Offset % 26)];
    // //rotor2 rotate
    // if (rotor1Offset % 26 === 0 && rotor1Offset > 0) {
    //   rotor1Offset = 0;
    //   rotor2Offset++;
    // }
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
