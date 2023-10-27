function findTermInstances(text, terms) {
  // Define common pronoun groupings for easier term matching.
  const pronouns = {
    firstPersonSingular: ["I", "me", "my", "mine", "myself"],
    firstPersonPlural: ["we", "us", "our", "ours", "ourselves"],
    secondPersonSingular: ["you", "your", "yourself"],
  };

  // Initialize an empty array to store terms that match from the text.
  const matchedTerms = [];

  // Split the input terms by comma, trim them and convert to lowercase.
  const termList = terms.split(",").map((term) => term.trim().toLowerCase());

  // Split the input text by spaces and remove any non-alphabetical characters from each word.
  const words = text.split(" ").map((word) => word.replace(/[^a-zA-Z]/g, ""));

  // Initialize an array to store the final list of terms we need to check against the text.
  let termsToCheck = [];

  // Loop over each term in the termList.
  for (let i = 0; i < termList.length; i++) {
    let isPronoun = false;

    // Extract the keys (types of pronoun groupings) from the pronouns object.
    const pronounTypes = Object.keys(pronouns);

    // Loop over each pronoun type to check if the term is a pronoun.
    for (let j = 0; j < pronounTypes.length; j++) {
      // If the current term is found in any of the pronoun lists,
      // add all pronouns from that list to termsToCheck.
      if (
        pronouns[pronounTypes[j]]
          .map((p) => p.toLowerCase())
          .includes(termList[i])
      ) {
        termsToCheck = termsToCheck.concat(pronouns[pronounTypes[j]]);
        isPronoun = true;
        break; // exit the loop once a match is found.
      }
    }

    // If the current term wasn't a pronoun, add it directly to termsToCheck.
    if (!isPronoun) {
      termsToCheck.push(termList[i]);
    }
  }

  // Loop over each word in the text.
  for (let i = 0; i < words.length; i++) {
    // If the word (or its lowercase version) is in termsToCheck and not yet in matchedTerms,
    // add it to matchedTerms.
    if (
      termsToCheck.includes(words[i]) ||
      termsToCheck.includes(words[i].toLowerCase())
    ) {
      if (!matchedTerms.includes(words[i])) {
        matchedTerms.push(words[i]);
      }
    }
  }

  // Return the list of matched terms.
  return matchedTerms;
}

// Test examples.
console.log(
  findTermInstances("You must ensure that your fees are not high", "you"),
  ["You", "your"]
);

console.log(
  findTermInstances("The Customer is always right", "Customer, you"),
  ["Customer"]
);

console.log(
  findTermInstances("The Customer is not our client", "Customer, us"),
  ["Customer", "our"]
);

console.log(
  findTermInstances(
    "My rights cannot be abridged by myself, only the Client",
    "I, Client"
  ),
  ["My", "myself", "Client"]
);

console.log(
  findTermInstances("i) In this clause my documents are read", "Me"),
  ["my"]
);
