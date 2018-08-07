
const db = require('../database/connection');

const Image = {};

Image.all = () => {
  return db.any('SELECT * FROM images');
}

Image.max = () => {
  return db.any(`
  SELECT * FROM images
  WHERE upvotes = (SELECT MAX(upvotes) FROM images)`);
}

Image.upvote = image =>
  db.none(
    `UPDATE images
    SET upvote = upvote + 1
    WHERE id = ${image.id}`, data
  );

module.exports = Image;
