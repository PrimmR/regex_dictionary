import init, { search } from "./wasm/pkg/regex_dictionary.js";

// Matched words list
let matched = null;

// Keep track of 'show more' pages
let i = 1;
const chunk = 1000;

function display() {
    // Output dictionary values
    let output;
    if (!matched) {
        output = "Invalid Regex";
    } else if (matched.length === 0) {
        output = "No Matches";
    } else {
        output = matched.slice(0, i * chunk).join('\n');
    }
    document.getElementById("Out").textContent = output;

    // Determine whether to show 'show more' button
    let display;
    if (matched.length > i * chunk) {
        display = "inline-block";
    } else {
        display = "none";
    }
    document.getElementById("More").style.display = display;
}

init().then(() => {
    // Add event listeners on 2 interaction points
    document.getElementById("Box").addEventListener("input", () => {
        i = 1;

        let expr = document.getElementById("Box").value;
        matched = search(expr);
        display();
    });

    document.getElementById("More").addEventListener("click", () => {
        i++;
        display();
    })
}).catch(console.error);
