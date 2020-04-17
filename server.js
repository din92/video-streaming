let express = require("express");
let app = express();
let router = express.Router();
let routes = require("./route")(router);
let path = require("path");
let bodyParser = require("body-parser");
let http = require("http");
let server = http.createServer(app);
let express_session = require("express-session")
// let socket = require("socket.io")(server);
// let socket_session = require("express-socket.io-session")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express_session({
    secret:"my-secret",
    resave:true,
    saveUninitialized:true
}));
// socket.use(socket_session({
//     resave:true
// }));

app.use(express.static(path.join(__dirname,"/src/dist")));
app.use(routes);

var PORT = 5552
let onListen=()=>{
    console.log("server is listening on port ",PORT)
}
server.listen(PORT);
server.on("listening",onListen)


