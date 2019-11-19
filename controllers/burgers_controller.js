var burger = require("../models/burger");

module.exports = function(app) {
  app.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbrsObj = {
        burgers: data
      };
      console.log(hbrsObj);
      res.render("index", hbrsObj);
    });
  });

  app.post("/api/burgers", function(req, res) {
    console.log("endpoint hit");
    console.log(req.body);
    burger.insertOne(
      ["burger_name", "devoured"],
      [req.body.burger_name, req.body.devoured],
      function(result) {
        res.json({ id: result.insertId });
      }
    );
  });

  app.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.updateOne(
      {
        devoured: req.body.devoured
      },
      condition,
      function(result) {
        if (result.changedRows === 0) {
          return res.status(404).end();
        } else {
          res.status(200).end();
        }
      }
    );
  });

  app.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.deleteOne(condition, function(result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
};
