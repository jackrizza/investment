use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub enum AccountType {
    IRA,
    Brokerage
}

#[derive(Serialize, Deserialize)]
pub struct Account {
    pub account_type : AccountType,
    pub total_holdings : f64,
}