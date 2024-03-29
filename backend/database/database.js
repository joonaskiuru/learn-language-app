const mysql = require("mysql");
require("dotenv").config();

const credentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const db = {
  authenticate: (userData) => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query(
            `SELECT * FROM users WHERE name = '${userData.userName}' AND password = '${userData.password}';`,
            (err, response) => {
              // Error handling
              if (err) {
                reject(err);
              } else if (response.length == 0) {
                resolve("Invalid Login");
              } else {
                connection.end();
                let token = "";
                for (let i = 0; i < 2; i++) {
                  token += Math.random().toString(36).substring(2);
                }

                resolve({
                  user_id: response[0]["id"],
                  token: token,
                  is_admin: response[0]["is_admin"],
                });
              }
            }
          );
        }
      });
    });
  },

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

  findPointsByUser: (id) => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query(
            `SELECT * FROM points WHERE user_id = ${id};`,
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

  findPointsByExercise: (id, exercise_name) => {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection(credentials);
      connection.connect((err) => {
        // mysql connection
        if (err) {
          console.error("Error connecting to MySQL:", err);
          process.exit(1);
        } else {
          connection.query(
            `SELECT * FROM points WHERE user_id = ${id} AND exercise_name = '${exercise_name}';`,
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
              connection.query(
                `DELETE FROM exercises WHERE id = ${id};`,
                (err, response) => {
                  // Error handling
                  if (err) {
                    reject(err);
                  }
                  connection.query(
                    `DELETE FROM points WHERE exercise_id = ${id};`,
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
                    let wordsData = "";
                    content.words.map((x) => {
                      wordsData += `("${x["original"]}","${x["translated"]}",${ex_id}),`;
                    });
                    wordsData = wordsData.slice(0, -1);
                    const wordsQuery = `INSERT INTO words(original, translated,exercise_id) VALUES 
                      ${wordsData};`;
                    connection.query(wordsQuery, (err, response) => {
                      // Error handling
                      if (err) {
                        reject({
                          msg: err,
                        });
                      }
                      connection.query(
                        "SELECT id FROM users;",
                        (err, response) => {
                          // Error handling
                          if (err) {
                            reject({
                              msg: err,
                            });
                          }
                          let values = "";
                          for (const item of response) {
                            values += `("${content["exerciseName"]}", 0, ${content.words.length},${item["id"]}, ${ex_id}),`;
                          }
                          values = values.slice(0, -1);
                          connection.query(
                            `INSERT INTO points(exercise_name,points,max_points,user_id,exercise_id) VALUES ${values};`,
                            (err, response) => {
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
                    });
                  }
                );
              }
            );
          } else if (topic == "points") {
            connection.query(
              `UPDATE ${topic}
                SET points =${connection.escape(
                  content["points"]
                )}
                WHERE user_id = ${connection.escape(content["user_id"])} AND 
                exercise_id = ${connection.escape(content["exercise_id"])};`,

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
        }
      });
    });
  },
};

module.exports = db;
