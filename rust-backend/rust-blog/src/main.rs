#[macro_use]
extern crate diesel;
use dotenvy::dotenv;
use std::env;

use diesel::pg::PgConnection;
use diesel::prelude::*;

pub mod models;
pub mod schema;

fn main() {
    dotenv().ok();
    let db_url = env::var("DATABASE_URL").expect("db url not found");

    let mut conn = PgConnection::establish(&db_url).expect("DB no connected");

    use self::models::{NewPost, Post};
    use self::schema::posts;
    use self::schema::posts::dsl::*;

    let new_post = NewPost {
        title: "Mi tercer post",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi libero odio, commodo a consectetur ut, ultrices nec libero. Integer suscipit mi nunc, ut vulputate felis lacinia nec. Praesent nec sem turpis. Maecenas aliquam non nunc ut bibendum. Donec eget condimentum metus, eu venenatis enim. Cras porttitor facilisis nisl, at pretium elit facilisis a. Duis ultricies et lacus eu bibendum. Curabitur quis enim convallis, gravida orci eu, eleifend sapien.",
        slug: "tercer-post",
    };
    let _post: Post = diesel::insert_into(posts::table)
        .values(&new_post)
        .get_result(&mut conn)
        .expect("Insert post error");

    let posts_list = posts.limit(1).load::<Post>(&mut conn).expect("Query error");
    for post in posts_list {
        println!("{:?}", post);
    }
}
