extern crate diesel;
use dotenvy::dotenv;
use std::env;

use actix_web::{App, HttpResponse, HttpServer, Responder, get, post, web};
use diesel::pg::PgConnection;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager, Pool};
use tera::{Context, Tera};

pub mod models;
pub mod schema;

use models::{NewPostHandler, Post};
use schema::posts::dsl::*;

pub type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[get("/")]
async fn index(pool: web::Data<DbPool>, tmplt_mngr: web::Data<Tera>) -> impl Responder {
    let mut conn = pool.get().expect("Problemas al traer la base de datos");
    match web::block(move || posts.load::<Post>(&mut conn)).await {
        Ok(data) => {
            let mut ctx = Context::new();
            ctx.insert("posts", &(data.unwrap()));
            HttpResponse::Ok()
                .content_type("text/html")
                .body(tmplt_mngr.render("index.html", &ctx).unwrap())
        }
        Err(_) => HttpResponse::Ok().body("Hubo un error"),
    }
}

#[get("/blog/{post_slug}")]
async fn get_post(
    pool: web::Data<DbPool>,
    tmplt_mngr: web::Data<Tera>,
    post_slug: web::Path<String>,
) -> impl Responder {
    let mut conn = pool.get().expect("Problemas al traer la base de datos");
    let post_slug: String = post_slug.into_inner();
    match web::block(move || posts.filter(slug.eq(post_slug)).load::<Post>(&mut conn)).await {
        Ok(data) => {
            let data = data.unwrap();
            match data.len() {
                0 => HttpResponse::NotFound().finish(),
                _ => {
                    let mut ctx = Context::new();
                    ctx.insert("post", &data[0]);
                    HttpResponse::Ok()
                        .content_type("text/html")
                        .body(tmplt_mngr.render("post.html", &ctx).unwrap())
                }
            }
        }
        Err(_) => HttpResponse::Ok().body("Hubo un error"),
    }
}

#[post("/new-post")]
async fn new_post(pool: web::Data<DbPool>, item: web::Json<NewPostHandler>) -> impl Responder {
    let mut conn = pool.get().expect("Problemas con traer la base de datos");

    match web::block(move || Post::create_post(&mut conn, &item)).await {
        Ok(post) => HttpResponse::Ok().json(post.unwrap()),
        Err(err) => HttpResponse::Ok().body(format!("Error: {}", err)),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let db_url = env::var("DATABASE_URL").expect("db url not found");
    let port = env::var("PORT").expect("Port not found");
    let port: u16 = port.parse().unwrap_or(9900);
    let conn = ConnectionManager::<PgConnection>::new(db_url);
    let pool: DbPool = Pool::builder()
        .build(conn)
        .expect("Could not build connection pool");
    let tera = Tera::new(concat!(env!("CARGO_MANIFEST_DIR"), "/templates/**/*")).unwrap();
    println!("listening on IPv4 address \"0.0.0.0\", port {}", port);
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .app_data(web::Data::new(tera.clone()))
            .service(index)
            .service(new_post)
            .service(get_post)
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await
}
