/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var result = {
      SearchTerm: searchTerm,
      Results: []
    };
    // Loop through each book
    for (var book of scannedTextObj) {
      var combinedLines = "";
      for (var i = 0; i < book.Content.length; i++) {
        // Combine all lines in each book into one long string
        combinedLines += book.Content[i].Text + " ";
      }
      // Separate all the words from the long string
      var words = combinedLines.split(' ');
      console.log(words);
      // Loop through the array of individual words
      for (var j = 0; j < words.length; j++) {
        // Check if the word ends in a hyphen indicating a word break
        if (words[j].slice(-1) === "-"){
            // Take away the hyphen at the end and concatenate it with the next one
            if (words[j].slice(0,-1) +  words[j+1] === searchTerm ) {
                // Find the line number that contains the search term
                console.log(j);
                // We assume that each line has an average of 10 words
                var lineNumber = book.Content[Math.floor(j / 10)].Line;
                result.Results.push({
                  ISBN: book.ISBN,
                  Page: book.Content[Math.floor(j / 10)].Page,
                  Line: lineNumber
                });
              }
        } 
        // Checking for the rest of the words and using regex to match any 
        // non-word character ([^\w]) at the end of the string ($) and replacing it with and empty string
        if (words[j].replace(/[^\w]$/, "") === searchTerm) {
            var lineNumber = book.Content[Math.floor(j / 10)].Line;
                result.Results.push({
                  ISBN: book.ISBN,
                  Page: book.Content[Math.floor(j / 10)].Page,
                  Line: lineNumber
                });
        }
      }
    }
    // Return the result object
    return result;
  }
  
  
  

  
  
  

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

console.log(findSearchTermInBooks("darkness", twentyLeaguesIn));
