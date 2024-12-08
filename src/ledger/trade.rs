use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Trades {
    pub all : Vec<Trade>
}

#[derive(Serialize, Deserialize, Clone)]
pub enum TradeType {
    Stock(StockTrade),
    Option(OptionTrade),
}

#[derive(Serialize, Deserialize, Clone)]
pub struct StockTrade {
    pub quantity: i32,
    pub price: f64,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct OptionTrade {
    pub quantity: i32,
    pub price: f64,
    pub expiry: String,
    pub strike: f64,
    pub call: bool,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Trade {
    pub uid : String,
    pub symbol: String,
    pub placed: String,
    pub executed: Option<String>,
    pub details : TradeType,
}