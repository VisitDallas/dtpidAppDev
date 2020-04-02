const http = require('http');

let express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/prehotelform", function(req, res){
   res.render("preHotelFormFinal");
});

app.get("/posthotelform", function(req, res) {
    res.render("postHotelFormFinal");
});

app.get("/preeventform", function(req, res) {
    res.render("preEventFormFinal");
});

app.get("/posteventform", function(req, res) {
    res.render("postEventFormFinal");
});

app.get("*", function(req, res){
    res.render("home");
});

app.listen(process.env.PORT, process.env.IP);