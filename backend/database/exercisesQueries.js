const mysql = require("mysql");
require("dotenv").config();

const credentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const db = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query("SELECT * FROM exercises;", (err, response) => {
            // Error handling
            if (err) {
              return reject(err);
            }
            connection.end();
            return resolve(response);
          });
        }
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query(
            `SELECT * FROM exercises WHERE id = ${id};`,
            (err, response) => {
              // Error handling
              if (err) {
                reject(err);
              }
              if (response.length == 0) {
                reject({
                  msg: `Exercise not found in database with id: ${id}`,
                });
              }
              connection.end();
              resolve(response);
            }
          );
        }
      });
    });
  },

  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query(
            `DELETE FROM exercises WHERE id = ${id};`,
            (err, response) => {
              // Error handling
              if (err) {
                reject(err);
              }
              if (response.affectedRows == 0) {
                reject({
                  msg: `Exercise not found in database with id: ${id}`,
                });
              }
              connection.end();
              resolve(response);
            }
          );
        }
      });
    });
  },

  save: (word) => {
    return new Promise((resolve, reject) => {
      if (!word.original || !word.translated) {
        reject({
          msg: `Error in inserted values. Original: ${word.original} Translated: ${word.translated}`,
        });
      }

      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query(
            `INSERT INTO words(original, translated) VALUES (${connection.escape(
              word["original"]
            )},${connection.escape(word["translated"])});`,
            (err, response) => {
              // Error handling
              if (err) {
                reject(err);
              }
              connection.end();
              resolve(response);
            }
          );
        }
      });
    });
  },
};

module.exports = db;
