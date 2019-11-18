$(function() {
  $("create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $("#newBurger")
        .val()
        .trim(),
      devoured: 0
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function() {
      console.log("New burger added!");
      location.reload();
    });
  });

  $(".eatBurger").on("click", function(event) {
    event.preventDefault();

    var id = $(this).data("id");
    var devouredState = {
      devoured: 1
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState
    }).then(function() {
      console.timeLog("Burger devoured!");
      location.reload();
    });
  });

  $(".trashBurger").on("click", function(event) {
    event.preventDefault();

    var id = $(this).data("id");

    $.ajax({
      type: "DELETE",
      url: "/api/burgers/" + id
    }).then(location.reload());
  });
});
