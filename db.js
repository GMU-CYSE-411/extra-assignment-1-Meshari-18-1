const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const DEFAULT_DB_FILE = path.join(__dirname, "training-lab.sqlite");

function openDatabase(databaseFile = DEFAULT_DB_FILE) {
  const db = new sqlite3.Database(databaseFile);

  return {
    databaseFile,
    run(sql, params = []) {
      return new Promise((resolve, reject) => {
        db.run(sql, params, function onRun(error) {
          if (error) {
            reject(error);
            return;
          }

          resolve({
            lastID: this.lastID,
            changes: this.changes
          });
        });
      });
    },
    get(sql, params = []) {
      return new Promise((resolve, reject) => {
        db.get(sql, params, (error, row) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(row);
        });
      });
    },
    all(sql, params = []) {
      return new Promise((resolve, reject) => {
        db.all(sql, params, (error, rows) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(rows);
        });
      });
    },
    close() {
      return new Promise((resolve, reject) => {
        db.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });
    }
  };
}

module.exports = {
  DEFAULT_DB_FILE,
  openDatabase
};
