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
      baseUrl: "http://cryptic-brushlands-17416.herokuapp.com/",
      endpoints: [

        {method: "GET", path: "/api", description: "Describes all available endpoints"},
      // users below


        {method: "GET", path: "/api/users", description: "Get a list of users"},
        {method: "POST", path: "/api/users", description: "Create a new user"},


        // {method: "GET", path: "/api/users/:id", description: "Get info on a specific user by id"},
        {method: "PUT", path: "/api/users/:id", description: "Update info on a specific user by id"},
        {method: "DELETE", path: "/api/users/:id", description: "Delete a specific user by id"},

      // time slots below  -- GET, PUT, and DELETE functionality for Admin when customizing the schedule
        {method: "GET", path: "/api/timeSlots", description: "Get a list of timeSlots"}
        /*
        {method: "GET", path: "/api/timeSlots/:id", description: "Get info on a specific user by id"},
        {method: "PUT", path: "/api/timeSlots/:id", description: "Update info on a specific user by id"},
        {method: "DELETE", path: "/api/timeSlots/:id", description: "Delete a specific user by id"}
        */
      ]
    });
  });

  // routes for users
  // app.get("/api/users", controllers.users.index);
  // app.post("/api/users", controllers.users.create);
  // app.put("/api/users", controllers.users.update);
  // app.delete("/api/users", controllers.users.destroy);


  // routes for timeSlots
  // app.get("/api/timeSlots", controllers.timeSlots.index);
  // app.post("/api/timeSlots", controllers.timeSlots.create);
  // app.put("/api/timeSlots", controllers.timeSlots.update);
  // app.delete("/api/timeSlots", controllers.timeSlots.destroy);



app.listen(process.env.PORT || 3000);