var express = require("express");
var burger = require("../models/burger");

var router = express.Router();

router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbrsObj = {
      burgers: data
    };
    console.log(hbrsObj);
    res.render("index", hbrsObj);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    function(result) {
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", function(req, res) {
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

router.delete(condition, function(req, result) {
  var condition = "id = " + req.params.id;

  burger.deleteOne(condition, function(res) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
