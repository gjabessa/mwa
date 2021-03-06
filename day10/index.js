const express =  require("express");
const path= require("path");
const app = express();

require("./api/data/db");
require("./api/model/job")

const routes = require("./api/routes/index");


app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));
app.use("/node_modules",express.static(path.join(__dirname,"node_modules")));
app.use(express.static(path.join(__dirname,"public")));

app.use("/api", routes);


app.set("port", 5050);
const server =  app.listen(app.get("port"), function(){
	const PORT = server.address().port;
	console.log("Server is running on port: "+ PORT);
});