pub mod trade;
pub mod account;

use std::collections::HashMap;
use serde::{Serialize, Deserialize};
use std::fs::File;

#[derive(Serialize, Deserialize)]
pub struct Ledger {
    pub accounts: HashMap<String, account::Account>,
    pub trades : HashMap<String, trade::Trades>,
}

impl Ledger {
    pub fn new() -> Ledger {
        Ledger {
            accounts: HashMap::new(),
            trades: HashMap::new(),
        }
    }

    pub fn pull(file_path : String) -> Ledger {
        let file = File::open(file_path).unwrap();
        let ledger : Ledger = serde_json::from_reader(file).unwrap();
        ledger
    }

    pub fn push(&self, file_path : String) {
        let file = File::create(file_path).unwrap();
        serde_json::to_writer(file, self).unwrap();
    }
}