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

#[get("/")]
async fn hello_world() -> impl Responder {
    HttpResponse::Ok().body("Hello world")
}
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let db_url = env::var("DATABASE_URL").expect("db url not found");
    let conn = ConnectionManager::<PgConnection>::new(db_url);
    let pool = Pool::builder()
        .build(conn)
        .expect("Could not build connection pool");

    HttpServer::new(move || App::new().app_data(pool.clone()).service(hello_world))
        .bind(("127.0.0.1", 9900))?
        .run()
        .await

    // let mut conn = PgConnection::establish(&db_url).expect("DB no connected");

    // use self::models::{NewPost, Post};
    // use self::schema::posts;
    // use self::schema::posts::dsl::*;

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
