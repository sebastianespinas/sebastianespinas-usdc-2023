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
        // We create an object with each word in the book being the key and the index of the 
        // corresponding content object being the value
        var combinedLines = {};
        for (var i = 0; i < book.Content.length; i++) {
            let words = book.Content[i].Text.split(' ');
            for (let j = 0; j < words.length; j++) {
                combinedLines[words[j]] = i;
            }
        }
        // Now we iterate through each word (keys in the object we created earlier)
        var combinedLinesKeys = Object.keys(combinedLines)
        for (var j = 0; j < combinedLinesKeys.length; j++) {
        // Check if the word ends in a hyphen indicating a word break
        if (combinedLinesKeys[j].slice(-1) === "-"){
            // Take away the hyphen at the end and concatenate it with the next one
            if (combinedLinesKeys[j].slice(0,-1) +  combinedLinesKeys[j+1] === searchTerm ) {
                // Find the line number that contains the search term by using the values of our object
                var lineNumber = book.Content[Object.values(combinedLines)[j+1]].Line;
                result.Results.push({
                    ISBN: book.ISBN,
                    Page: book.Content[Object.values(combinedLines)[j+1]].Page,
                    Line: lineNumber
                });
              }
        } 
        // Checking for the rest of the words and using regex to match any 
        // non-word character ([^\w]) at the end of the string ($) and replacing it with and empty string
        if (combinedLinesKeys[j].replace(/[^\w]$/, "") === searchTerm) {
            var lineNumber = book.Content[Object.values(combinedLines)[j]].Line;
            result.Results.push({
                ISBN: book.ISBN,
                Page: book.Content[Object.values(combinedLines)[j]].Page,
                Line: lineNumber
            });
        }
      }
    }
    // Return a result object with the search term and an empty Results array if no matches are found
    return result;
  }




  
/** Example input objects. */
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


const twentyLeaguesInTwice = [
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
    },
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

const twentyLeaguesOutTwice = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const twentyLeaguesOutNone = {
    "SearchTerm": "Null",
    "Results": []
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

/** Two Books in the object */
const test3result = findSearchTermInBooks("the", twentyLeaguesInTwice); 
if (test3result.Results.length == 2) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOutTwice.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** No matches should be an empty list */
const test4result = findSearchTermInBooks("Null", twentyLeaguesIn); 
if (JSON.stringify(twentyLeaguesOutNone) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesOutNone);
    console.log("Received:", test4result);
}

/** Testing hyphenated word breaks */
const test5result = findSearchTermInBooks("darkness", twentyLeaguesIn); 
if (test5result.Results.length == 1) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", "1");
    console.log("Received:", test5result.Results.length);
}

/** Testing capitalized words */
const test6result = findSearchTermInBooks("The", twentyLeaguesIn); 
if (test6result.Results.length == 1) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", "1");
    console.log("Received:", test6result.Results.length);
}

/** Testing nested punctuation */
const test7result = findSearchTermInBooks("Canadian's", twentyLeaguesIn); 
if (test7result.Results.length == 1) {
    console.log("PASS: Test 7 ");
    console.log(test7result);

} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", "1");
    console.log("Received:", test7result.Results.length);
}

/** Testing punctuations after a word */
const test8result = findSearchTermInBooks("profound", twentyLeaguesIn); 
if (test8result.Results.length == 1) {
    console.log("PASS: Test 8 ");
    console.log(test8result);

} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", "1");
    console.log("Received:", test8result.Results.length);
}

