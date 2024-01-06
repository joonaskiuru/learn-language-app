const mysql = require("mysql");
require("dotenv").config();

const credentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const db = {
  findAll: (topic) => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query(`select * from ${topic};`, (err, response) => {
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

  findById: (topic, id) => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query(
            `SELECT * FROM ${topic} WHERE id = ${id};`,
            (err, response) => {
              // Error handling
              if (err) {
                reject(err);
              }
              if (response.length == 0) {
                reject({
                  msg: `word not found in database with id: ${id}`,
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

  deleteById: (topic, id) => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query(
            `DELETE FROM ${topic} WHERE id = ${id};`,
            (err, response) => {
              // Error handling
              if (err) {
                reject(err);
              }
              if (response.affectedRows == 0) {
                reject({
                  msg: `Item not found in database with id: ${id}`,
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

  save: (topic, content) => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          reject({
            msg: `Error in inserted values: ${x}`,
          });
        } else {
          if (topic == "words") {
            connection.query(
              "SELECT MAX(id) FROM exercises;",
              (err, response) => {
                // Error handling
                if (err) {
                  reject({
                    msg: err,
                  });
                }
                const ex_id =
                  parseInt(JSON.stringify(response[0]["MAX(id)"])) + 1;
                connection.query(
                  `INSERT INTO words(original, translated,language,exercise_id) VALUES (
                  ${connection.escape(content["original"])},
                  ${connection.escape(content["translated"])},
                  ${connection.escape(content["language"])},
                  ${ex_id});`,
                  (err, response) => {
                    // Error handling
                    if (err) {
                      reject({
                        msg: err,
                      });
                    }
                    connection.end();
                    resolve(response);
                  }
                );
              }
            );
          }
        }
      });
    });
  },
};

module.exports = db;
