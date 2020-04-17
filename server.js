let common=require("./common");
let express = require("express");
let app = express();
let router = express.Router();
let routes = require("./route")(router,common);
let path = require("path");
let bodyParser = require("body-parser");
let http = require("http");
let server = http.createServer(app);
let express_session = require("express-session")({
        secret:"my-secret",
        resave:true,
        saveUninitialized:true
    });
let socket = require("socket.io")(server);
let socket_session = require("socket.io-express-session");
let sw = require("socketio-wildcard")();

app.use(express_session);
socket.use(socket_session(express_session,{
    resave:true
}));

let logicio = socket.of("/logicio");
logicio.use(sw);
logicio.on('connection',(socket)=>{
    socket.on("*",async (packet)=>{
        packet = packet.data;
      if(packet && packet[0] && packet[1]){
        let endPoint = packet[0];
        let {reqId,data} = packet[1];
        let [apiKey,method]= endPoint.split("->");
        let backend = common[apiKey];
        if(backend && backend[method] && typeof backend[method] ==="function"){
           await backend[method]({socket,respond:(response)=>{
                socket.emit(endPoint+":"+reqId+":reply",response)
            }},data);
        }
      }
    })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"/src/dist")));
app.use(routes);

var PORT = 5552
let onListen=()=>{
    console.log("server is listening on port ",PORT)
}
server.listen(PORT);
server.on("listening",onListen)


