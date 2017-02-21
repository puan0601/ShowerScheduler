var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  db = require("./models"),
  controllers = require("./controllers");

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static("public"));

  app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });

  app.get("/api", function apiIndex(req, res) {
    res.json({
      documentationUrl: "#",
      baseUrl: "http://showerly.herokuapp.com/",
      endpoints: [

        {method: "GET", path: "/api", description: "Describes all available endpoints"},
        // Endpoints for users
        {method: "GET", path: "/api/users", description: "Get a list of users"},
        {method: "POST", path: "/api/users", description: "Create a new user"},
        {method: "GET", path: "/api/users/:id", description: "Get info on a specific user by id"},
        {method: "PUT", path: "/api/users/:id", description: "Update info on a specific user by id"},
        {method: "DELETE", path: "/api/users/:id", description: "Delete a specific user by id"},
        // Endpoints for Time Slots
        {method: "GET", path: "/api/timeslots", description: "Get a list of timeSlots"},
        {method: "GET", path: "/api/timeslots/:id", description: "Get info on a specific user by id"},
        {method: "PUT", path: "/api/timeslots/:id", description: "Update info on a specific user by id"},
      ]
    });
  });



// JSON API Endpoints

  // routes for users
  app.get("/api/users", controllers.users.index);
  app.post("/api/users", controllers.users.create);
  app.delete("/api/users/:id", controllers.users.destroy);
  app.get("/api/users/:id", controllers.users.show);
  app.put("/api/users/:id", controllers.users.update);

  // routes for timeSlots
  app.get("/api/timeSlots", controllers.timeSlots.index);
  app.put("/api/timeSlots/:id", controllers.timeSlots.update);
  app.get("/api/timeSlots/:id", controllers.timeSlots.show);


app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
