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

  findWordsByExerciseId: (id) => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query(
            `SELECT * FROM words WHERE exercise_id = ${id};`,
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

  deleteExercise: (id) => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query(
            `DELETE FROM words WHERE exercise_id = ${id};`,
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
              connection.query(
                `DELETE FROM exercises WHERE id = ${id};`,
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
            console.log(content["exerciseName"] + ": exerciseName");
            console.log(content["language"] + ": language");
            connection.query(
              `INSERT INTO exercises(name,language) VALUES (
              ${connection.escape(content["exerciseName"])},
              ${connection.escape(content["language"])});`,
              (err, res) => {
                // Error handling
                if (err) {
                  reject({
                    msg: err,
                  });
                }
                connection.query(
                  "SELECT MAX(id) FROM exercises;",
                  (err, response) => {
                    // Error handling
                    if (err) {
                      reject({
                        msg: err,
                      });
                    }
                    const ex_id = JSON.stringify(response[0]["MAX(id)"]);
                    console.log(ex_id + ": ex id");
                    let wordsData = "";
                    content.words.map((x) => {
                      wordsData += `("${x["original"]}","${x["translated"]}",${ex_id}),`;
                    });
                    wordsData = wordsData.slice(0, -1);
                    const wordsQuery = `INSERT INTO words(original, translated,exercise_id) VALUES 
                      ${wordsData};`;
                    console.log(wordsQuery + " : words query");
                    connection.query(wordsQuery, (err, response) => {
                      // Error handling
                      if (err) {
                        reject({
                          msg: err,
                        });
                      }
                      connection.end();
                      resolve(response);
                    });
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
