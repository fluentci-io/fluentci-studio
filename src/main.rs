use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use mime_guess::from_path;
use rust_embed::RustEmbed;

#[derive(RustEmbed)]
#[folder = "webui/dist/"]
struct Asset;

#[actix_web::get("/{_:.*}")]
async fn dist(path: web::Path<String>) -> impl Responder {
    handle_embedded_file(path.as_str())
}

fn handle_embedded_file(path: &str) -> HttpResponse {
    match Asset::get(path) {
        Some(content) => HttpResponse::Ok()
            .content_type(from_path(path).first_or_octet_stream().as_ref())
            .body(content.data.into_owned()),
        None => HttpResponse::NotFound().body("404 Not Found"),
    }
}

#[actix_web::get("/")]
async fn index() -> impl Responder {
    handle_embedded_file("index.html")
}

#[actix_web::get("/project/{_:.*}")]
async fn project() -> impl Responder {
    handle_embedded_file("index.html")
}

#[actix_web::get("/run/{_:.*}")]
async fn run() -> impl Responder {
    handle_embedded_file("index.html")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let host = std::env::var("FLUENTCI_STUDIO_HOST").unwrap_or("127.0.0.1".to_string());
    let port = std::env::var("FLUENTCI_STUDIO_PORT").unwrap_or("6077".to_string());
    let addr = format!("{}:{}", host, port);

    HttpServer::new(|| {
        let cors = Cors::permissive();
        App::new()
            .wrap(cors)
            .service(index)
            .service(project)
            .service(run)
            .service(dist)
    })
    .bind(addr)?
    .run()
    .await
}
