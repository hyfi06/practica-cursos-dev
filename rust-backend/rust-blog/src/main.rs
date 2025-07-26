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

use models::{NewPost, Post, NewPostHandler};
use schema::posts;
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
async fn new_post(pool: web::Data<DbPool>) -> impl Responder {
    let mut conn = pool.get().expect("Problemas con traer la base de datos");

    let new_post = NewPost {
        title: "Mi post",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi libero odio, commodo a consectetur ut, ultrices nec libero. Integer suscipit mi nunc, ut vulputate felis lacinia nec. Praesent nec sem turpis. Maecenas aliquam non nunc ut bibendum. Donec eget condimentum metus, eu venenatis enim. Cras porttitor facilisis nisl, at pretium elit facilisis a. Duis ultricies et lacus eu bibendum. Curabitur quis enim convallis, gravida orci eu, eleifend sapien.",
        slug: "mi-post",
    };
    match web::block(move || {
        diesel::insert_into(posts::table)
            .values(new_post)
            .get_result::<Post>(&mut conn)
    })
    .await
    {
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

    // let mut conn = PgConnection::establish(&db_url).expect("DB no connected");

    // let new_post = NewPost {
    //     title: "Mi tercer post",
    //     body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi libero odio, commodo a consectetur ut, ultrices nec libero. Integer suscipit mi nunc, ut vulputate felis lacinia nec. Praesent nec sem turpis. Maecenas aliquam non nunc ut bibendum. Donec eget condimentum metus, eu venenatis enim. Cras porttitor facilisis nisl, at pretium elit facilisis a. Duis ultricies et lacus eu bibendum. Curabitur quis enim convallis, gravida orci eu, eleifend sapien.",
    //     slug: "tercer-post",
    // };
    // let _post: Post = diesel::insert_into(posts::table)
    //     .values(&new_post)
    //     .get_result(&mut conn)
    //     .expect("Insert post error");

    // let posts_list = posts.limit(1).load::<Post>(&mut conn).expect("Query error");
    // for post in posts_list {
    //     println!("{:?}", post);
    // }
}
