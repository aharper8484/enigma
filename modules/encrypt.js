function encrypt() {
  //substitution function
  let substitute = function (inputIndex, subArray, subOffset) {
    let newIndex = (inputIndex + subOffset) % 25;
    let subArrayFromObj = Array.from(subArray);
    let resultArray = [newIndex, subArrayFromObj[newIndex]];
    return resultArray;
  };

  class Rotor {
    constructor(letters, offset, count) {
      this.letters = letters;
      this.offset = parseInt(offset);
      this.count = count;
    }
    state() {
      return (this.count + this.offset) % 25;
    }
  }

  let fastRotor = new Rotor(
    fastRotorArray,
    document.getElementById("r1").value,
    0
  );

  let mediumRotor = new Rotor(
    mediumRotorArray,
    document.getElementById("r2").value,
    0
  );

  let slowRotor = new Rotor(
    slowRotorArray,
    document.getElementById("r3").value,
    0
  );

  //empty variable to select Reflector
  let reflectorArray;

  //user value retrieved from HTML - function to store choice in reflector Array variable
  let reflectorChoice = document.getElementById("reflector").value;
  if (reflectorChoice == "A") {
    reflectorArray = reflectorA;
  } else {
    reflectorArray = reflectorB;
  }

  let encryptedMsg = "";

  //function to retrieve text, remove space + non-letter characters and convert to uppercase
  var userInput = document
    .getElementById("encryption")
    .value.replace(/\s+/g, "")
    .toUpperCase();

  for (let i = 0; i < userInput.length; i++) {
    //plugboard substitution
    let plugboardSub = substitute(alphabet.indexOf(userInput), plugboard, 0);
    let fastRotorSub = substitute(
      plugboardSub[0],
      fastRotor.letters,
      fastRotor.state()
    );
    fastRotor.count++;
    let mediumRotorSub = substitute(
      fastRotorSub[0],
      mediumRotor.letters,
      mediumRotor.state()
    );
    if (fastRotor.count % 25 === 0) {
      mediumRotor.count++;
    }
    let slowRotorSub = substitute(
      mediumRotorSub[0],
      slowRotor.letters,
      slowRotor.state()
    );
    if (mediumRotor.count % 25 === 0 && mediumRotor.count > 0) {
      slowRotor.count++;
    }
    let reflectionSub = substitute(slowRotorSub[0], reflectorArray, 0);
    let slowRotorSubReturn = substitute(
      reflectionSub[0],
      slowRotor.letters,
      slowRotor.state()
    );
    let mediumRotorSubReturn = substitute(
      slowRotorSubReturn[0],
      mediumRotor.letters,
      mediumRotor.state()
    );
    let fastRotorSubReturn = substitute(
      mediumRotorSubReturn[0],
      fastRotor.letters,
      fastRotor.state()
    );
    let returnLetter = substitute(fastRotorSubReturn[0], plugboard, 0);
    encryptedMsg = encryptedMsg + returnLetter[1];
    console.log(fastRotor.state());
  }
  //push encrypted message and rotor counts to HTML using ID tags
  return console.log(
    (document.getElementById("messageE").innerHTML = encryptedMsg) +
      (document.getElementById("r1e").innerHTML = fastRotor.count) +
      (document.getElementById("r2e").innerHTML = mediumRotor.count) +
      (document.getElementById("r3e").innerHTML = slowRotor.count)
  );
}

export { encrypt };
