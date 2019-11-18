var connection = require("../config/connection");

function createQmarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function translateSql(obj) {
  for (var key in ob) {
    var value = ob[key];
    if (Pbject.hasOwnProperty.call(ob, key)) {
      if (typeOf(value) === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
}

var orm = {
  selectAll: function(table, cb) {
    var dbQuery = "SELECT * FROM " + table + ";";

    connection.query(dbQuery, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  insertOne: function(table, cols, vals, cb) {
    var dbQuery =
      "INSERT INTO " +
      table +
      " (" +
      "VALUES (" +
      createQmarks(vals.length) +
      ") ";
    console.log(dbQuery);
    connection.query(dbQuery, vals, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  updateOne: function(table, objColVals, condition, cb) {
    var dbQuery =
      "UPDATE " +
      table +
      " SET " +
      translateSql(objColVals) +
      " WHERE " +
      condition;

    console.log(dbQuery);
    connection.query(dbQuery, vals, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },

  deleteOne: function(table, condition, cb) {
    var dbQuery = "DELETE FROM " + table + " WHERE " + condition;

    console.log(dbQuery);
    connection.query(dbQuery, vals, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};

module.exports = orm;
