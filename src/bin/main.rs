extern crate ledger;

// use ledger::ledger::Ledger;
use ledger::routes::accounts;
use ledger::routes::trades;


use actix_web::{web, get, App, HttpServer, HttpResponse, Responder};
use actix_files as fs;


#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(include_str!("../../www/index.html"))
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
    .service(
        fs::Files::new("/cdn", "static/")
            .show_files_listing()
            .use_last_modified(true),
    )
            .service(index)
            .service(
            web::scope("/api")
                // accounts
                .service(accounts::get_all_accounts)
                .service(accounts::get_account)
                .service(accounts::create_account)
                .service(accounts::delete_account)
                // trades
                .service(trades::get_all_trades)
                .service(trades::get_trade)
                .service(trades::create_trade)
                .service(trades::delete_trade)

        )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}