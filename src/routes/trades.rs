use actix_web::{get, web, App, HttpServer, HttpResponse, Result};
use dotenv::dotenv;
use std::env;
use serde::{Serialize, Deserialize};
use serde_json::json;

use crate::ledger::trade::{Trades, Trade};
use crate::ledger::Ledger;
use crate::ledger::trade;


#[derive(Serialize, Deserialize)]
pub struct All {
    all : Vec<Trade>,
}

#[get("/trades/{account}/get_all")]
async fn get_all_trades(account: web::Path<String>) -> Result<HttpResponse> {
    dotenv().ok();
    let file_path = env::var("LEDGER_FILE").expect("LEDGER_FILE must be set");
    let ledger = Ledger::pull(file_path);

    if account.as_str() == "All" {
        let all_trades: Vec<Trade> = ledger.trades.values()
            .flat_map(|trades| trades.all.clone())
            .collect();
        let all_trades = All { all: all_trades };
        return Ok(HttpResponse::Ok().json(all_trades));
    }

    match ledger.trades.get(&account.into_inner()) {
        Some(trades) => Ok(HttpResponse::Ok().json(trades)),
        None => Ok(HttpResponse::NotFound().json("Account not found")),
    }
}

#[get("/trades/get/{account_type}/{trade_id}")]
async fn get_trade(req : web::Path<(String, String)>) -> Result<HttpResponse> {
    dotenv().ok();

    let (account_type, trade_id) = req.into_inner();

    let file_path = env::var("LEDGER_FILE").expect("LEDGER_FILE must be set");
    let ledger = Ledger::pull(file_path);
    let trades = ledger.trades.get(&account_type).unwrap();
    let trade = trades.all.iter().find(|t| t.uid == trade_id).unwrap();
    Ok(HttpResponse::Ok().json(trade))
}

#[get("/trades/create/{trade_id}")]
async fn create_trade(trade_id : web::Path<String>) -> Result<HttpResponse> {
    dotenv().ok();
    let trade_id = trade_id.into_inner();
    let file_path = env::var("LEDGER_FILE").expect("LEDGER_FILE must be set");
    let mut ledger = Ledger::pull(file_path.clone());
    ledger.trades.insert(trade_id.clone(), trade::Trades {
        all: vec![],
    });
    ledger.push(file_path);
    Ok(HttpResponse::Ok().json(format!("Created trade {}", trade_id)))
}

#[get("/trades/delete/{trade_id}")]
async fn delete_trade(trade_id : web::Path<String>) -> Result<HttpResponse> {
    dotenv().ok();
    let trade_id = trade_id.into_inner();
    let file_path = env::var("LEDGER_FILE").expect("LEDGER_FILE must be set");
    let mut ledger = Ledger::pull(file_path.clone());
    ledger.trades.remove(&trade_id);
    ledger.push(file_path);
    Ok(HttpResponse::Ok().json(format!("Deleted trade {}", trade_id)))
}
