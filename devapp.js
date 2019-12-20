const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

let express = require("express");
let app = express();

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//   });

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
    res.render("devhome");
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });