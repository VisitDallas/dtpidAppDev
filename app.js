var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/prehotelform", function(req, res){
   res.render("preHotelForm");
});

app.get("/posthotelform", function(req, res) {
    res.render("postHotelForm");
});

app.get("/preeventform", function(req, res) {
    res.render("preEventForm");
});

app.get("/posteventform", function(req, res) {
    res.render("postEventForm");
});

app.get("/tableautest", function(req, res) {
    res.render("tableauTest");
})

app.get("*", function(req, res){
    res.render("home");
});

app.listen(process.env.PORT, process.env.IP);