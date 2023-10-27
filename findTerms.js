function findTermInstances(text, terms) {
  const pronouns = {
    firstPersonSingular: ["I", "me", "my", "mine", "myself"],
    firstPersonPlural: ["we", "us", "our", "ours", "ourselves"],
    secondPersonSingular: ["you", "your", "yourself"],
  };

  const isPronoun = (term) => {
    for (let key in pronouns) {
      if (pronouns[key].map((p) => p.toLowerCase()).includes(term)) {
        return pronouns[key];
      }
    }
    return false;
  };

  const cleanWord = (word) => {
    return word.replace(/[^a-zA-Z]/g, "");
  };

  const addToMatchedTerms = (word, termsToCheck, matchedTerms) => {
    if (
      termsToCheck.includes(word) ||
      termsToCheck.includes(word.toLowerCase())
    ) {
      if (!matchedTerms.includes(word)) {
        matchedTerms.push(word);
      }
    }
  };

  const termList = terms.split(",").map((term) => term.trim().toLowerCase());
  const words = text.split(" ").map(cleanWord);
  const matchedTerms = [];
  let termsToCheck = [];

  termList.forEach((term) => {
    const pronounList = isPronoun(term);
    if (pronounList) {
      termsToCheck = termsToCheck.concat(pronounList);
    } else {
      termsToCheck.push(term);
    }
  });

  words.forEach((word) => {
    addToMatchedTerms(word, termsToCheck, matchedTerms);
  });

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
