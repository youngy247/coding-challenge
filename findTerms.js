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

  // TODO: Rest of the implementation
}
