use serde::{Deserialize, Serialize};

#[derive(Queryable, Deserialize, Serialize, Clone, Debug)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub slug: String,
    pub body: String,
}

use super::schema::posts;

#[derive(Insertable)]
#[table_name = "posts"]
pub struct NewPost<'a> {
    pub title: &'a str,
    pub slug: &'a str,
    pub body: &'a str,
}

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct NewPostHandler {
    pub title: String,
    pub body: String,
}
