
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

module.exports = Image;
