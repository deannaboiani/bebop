const mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});
function runSql(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, function (err, res) {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function runSeed() {
  await runSql(`DROP DATABASE IF EXISTS music`);
  await runSql(`DROP DATABASE IF EXISTS music`);
  await runSql(
    `CREATE DATABASE music DEFAULT CHARSET utf8 COLLATE utf8_general_ci;`
  );
  connection.destroy();
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "music",
  });
  await runSql(`DROP TABLE IF EXISTS artists`);
  await runSql(`CREATE TABLE artists  (
    id int(11) NOT NULL AUTO_INCREMENT,
    artist_name varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    user_id int(11) NULL DEFAULT NULL,
    createdTime datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id) USING BTREE
  )`);
  await runSql(
    `INSERT INTO artists VALUES (1, 'Coldplay', 1, '2021-11-02 15:24:15');`
  );
  await runSql(`DROP TABLE IF EXISTS comments;`);
  await runSql(`CREATE TABLE comments  (
    id int(11) NOT NULL AUTO_INCREMENT,
    comment text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
    user_id int(11) NULL DEFAULT NULL,
    artist_id int(11) NULL DEFAULT NULL,
    createdTime datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id) USING BTREE
  )`);
  await runSql(
    `INSERT INTO comments VALUES (1, 'I love them!', 1, 1, '2021-11-02 15:24:30');`
  );
  await runSql(`DROP TABLE IF EXISTS users`);
  await runSql(`CREATE TABLE users  (
    id int(11) NOT NULL AUTO_INCREMENT,
    username varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    password varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
    createdTime datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id) USING BTREE
  ) `);
  await runSql(
    `INSERT INTO users VALUES (1, 'abc', '123456', '2021-11-01 15:24:38')`
  );
  console.log("Finished!");
  process.exit(0);
}
runSeed();
