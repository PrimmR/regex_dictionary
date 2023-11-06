use regex::RegexBuilder;
use wasm_bindgen::prelude::*;

mod words;

static DICTIONARY: &[&str] = words::DICTIONARY;

#[wasm_bindgen]
pub fn search(expression: &str) -> Option<Vec<String>> {
    if expression.trim().len() == 0 {
        return Some(vec![String::from(" ")]);
    }

    if let Ok(re) = RegexBuilder::new(expression).case_insensitive(true).build() {
        // Use multi line mode to avoid initial vector?

        Some(
            DICTIONARY
                .iter()
                .filter(|word| re.is_match(word))
                .map(|x| x.to_uppercase())
                .collect(),
        )
    } else {
        None
    }
}