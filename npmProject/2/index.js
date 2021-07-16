const express = require("express");
const app = express();
const path = require("path")
const cors = require("cors")

const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
      origins: ['http://localhost:4200']
  }
});;

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors())

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});



require("./data/db"); //always import before any routes
app.use(express.json({extended:false}))
app.set("port",5050);


app.use("/api", cors(corsOptions), function(req,res,next){

    res.header("Access-Control-Allow-Origin", "http://localhost:4200")
  next();
})

const routes = require("./routes/routes")

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/api",routes)
app.use(express.static(path.join(__dirname, "public")));
// const server = app.listen(app.get("port"),function(){
//     console.log("Running on port ",server.address().port);
// });
http.listen(5050, function() {
  console.log('listening on *:5050');
});