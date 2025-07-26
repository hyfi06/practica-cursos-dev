#[macro_use]
extern crate diesel;
use dotenvy::dotenv;
use std::env;

use actix_web::{App, HttpResponse, HttpServer, Responder, get, post, web};

use diesel::pg::PgConnection;
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager, Pool};

pub mod models;
pub mod schema;

use models::{NewPostHandler, Post};
use schema::posts::dsl::*;

pub type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[get("/")]
async fn index(pool: web::Data<DbPool>) -> impl Responder {
    let mut conn = pool.get().expect("Problemas al traer la base de datos");
    match web::block(move || posts.load::<Post>(&mut conn)).await {
        Ok(data) => HttpResponse::Ok().json(data.unwrap()),
        Err(err) => HttpResponse::Ok().body("Hubo un error"),
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
    let conn = ConnectionManager::<PgConnection>::new(db_url);
    let pool: DbPool = Pool::builder()
        .build(conn)
        .expect("Could not build connection pool");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .service(index)
            .service(new_post)
    })
    .bind(("127.0.0.1", 9900))?
    .run()
    .await
}
