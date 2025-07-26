use super::schema::posts;
use diesel::PgConnection;
use diesel::prelude::*;

use serde::{Deserialize, Serialize};

#[derive(Queryable, Deserialize, Serialize, Clone, Debug)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub slug: String,
    pub body: String,
}

#[derive(Insertable)]
#[diesel(table_name = posts)]
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

impl Post {
    pub fn slugify(title: &String) -> String {
        title.replace(" ", "-").to_lowercase()
    }
    pub fn create_post<'a>(
        conn: &mut PgConnection,
        entry_post: &NewPostHandler,
    ) -> Result<Post, diesel::result::Error> {
        let slug = Self::slugify(&entry_post.title.clone());
        let new_post = NewPost {
            title: &entry_post.title,
            slug: &slug,
            body: &entry_post.body,
        };
        diesel::insert_into(posts::table)
            .values(new_post)
            .get_result::<Post>(conn)
    }
}
