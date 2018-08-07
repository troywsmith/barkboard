DROP DATABASE IF EXISTS barkboard;

CREATE DATABASE barkboard;

\c barkboard;

DROP TABLE IF EXISTS images;

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  name TEXT NOT NULL,
  upvotes INTEGER,
  downvotes INTEGER
);
