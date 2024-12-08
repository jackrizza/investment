use actix_web::{get, web, App, HttpServer, Result};
use actix_web::web::Json;
use dotenv::dotenv;
use std::env;
use serde_json::json;

use crate::ledger::Ledger;
use crate::ledger::account;

#[get("/accounts/get_all")]
async fn get_all_accounts() -> Result<Json<serde_json::Value>> {
    dotenv().ok();
    let file_path = env::var("LEDGER_FILE").expect("LEDGER_FILE must be set");
    let ledger = Ledger::pull(file_path);
    Ok(Json(json!(ledger.accounts)))
}

#[get("/accounts/get/{account_name}")]
async fn get_account(account_name : web::Path<String>) -> Result<Json<serde_json::Value>> {
    dotenv().ok();
    let account_name = account_name.into_inner();
    if account_name == "All" {
        let file_path = env::var("LEDGER_FILE").expect("LEDGER_FILE must be set");
        let ledger = Ledger::pull(file_path);
        let account = ledger.accounts;
        return Ok(Json(json!(account)))    
    } 

    let file_path = env::var("LEDGER_FILE").expect("LEDGER_FILE must be set");
    let ledger = Ledger::pull(file_path);
    let account = ledger.accounts.get(&account_name).unwrap();
    Ok(Json(json!(account)))
    
}

#[get("/accounts/create/{account_name}")]
async fn create_account(account_name : web::Path<String>) -> Result<Json<serde_json::Value>> {
    dotenv().ok();
    let account_name = account_name.into_inner();
    let file_path = env::var("LEDGER_FILE").expect("LEDGER_FILE must be set");
    let mut ledger = Ledger::pull(file_path.clone());
    ledger.accounts.insert(account_name.clone(), account::Account {
        account_type: account::AccountType::Brokerage,
        total_holdings: 0.0,
    });
    ledger.push(file_path);
    Ok(Json(json!({"message": format!("Created account {}", account_name)})))
}

#[get("/accounts/delete/{account_name}")]
async fn delete_account(account_name : web::Path<String>) -> Result<Json<serde_json::Value>> {
    dotenv().ok();
    let account_name = account_name.into_inner();
    let file_path = env::var("LEDGER_FILE").expect("LEDGER_FILE must be set");
    let mut ledger = Ledger::pull(file_path.clone());
    ledger.accounts.remove(&account_name);
    ledger.push(file_path);
    Ok(Json(json!({"message": format!("Deleted account {}", account_name)})))
}
