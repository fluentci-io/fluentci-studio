use actix_cors::Cors;
use actix_web::{web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use mime_guess::from_path;
use owo_colors::OwoColorize;
use reqwest::{header::HeaderMap, Client};
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

#[actix_web::get("/projects/{_:.*}")]
async fn projects() -> impl Responder {
    handle_embedded_file("index.html")
}

async fn proxy(bytes: web::Bytes, req: HttpRequest) -> HttpResponse {
    let mut headers = HeaderMap::new();
    let proxied_headers = req.headers().clone();

    let body = String::from_utf8(bytes.to_vec()).unwrap_or("".to_string());

    proxied_headers.into_iter().for_each(|(name, value)| {
        let key = match name.as_str() {
            "content-type" => "Content-Type",
            "authorization" => "Authorization",
            "user-Agent" => "User-Agent",
            "accept" => "Accept",
            "accept-Encoding" => "Accept-Encoding",
            "accept-Language" => "Accept-Language",
            "cache-Control" => "Cache-Control",
            "connection" => "Connection",
            "host" => "Host",
            "origin" => "Origin",
            "referer" => "Referer",
            _ => "Unknown-Header",
        };
        let value = value.to_str().unwrap();
        headers.insert(key, value.parse().unwrap());
    });

    let port = std::env::var("FLUENTCI_GRAPHQL_PORT").unwrap_or("5090".to_string());

    // Extract the target URL from the request
    let target_url = format!(
        "http://localhost:{}{}?{}",
        port,
        req.uri(),
        req.query_string()
    );

    let client = Client::new();
    let proxied_response = client
        .request(req.head().method.clone(), &target_url)
        .body(body)
        .headers(headers)
        .send()
        .await
        .unwrap(); // Note: Handle errors appropriately

    // Extract the response body
    let status = proxied_response.status();
    let response_headers = proxied_response.headers();

    let mut response = HttpResponse::build(status);

    for (name, value) in response_headers.iter() {
        response.append_header((name.to_string(), value.to_str().unwrap()));
    }

    let body = proxied_response.text().await.unwrap(); // Note: Handle errors appropriately

    response.body(body)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let host = std::env::var("FLUENTCI_STUDIO_HOST").unwrap_or("127.0.0.1".to_string());
    let port = std::env::var("FLUENTCI_STUDIO_PORT").unwrap_or("6077".to_string());
    let addr = format!("{}:{}", host, port);

    println!("Starting server on {}", addr.green());

    HttpServer::new(|| {
        let cors = Cors::permissive();
        App::new()
            .wrap(cors)
            .route("/graphql", web::to(proxy))
            .service(index)
            .service(projects)
            .service(dist)
    })
    .bind(addr)?
    .run()
    .await
}
