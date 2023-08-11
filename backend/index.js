const http = require("http")
const express =  require("express")
const socket = require("socket.io")
const cors = require("cors")

const app = express()

app.use(cors())

const users = [{}]


app.get("/",(req, res)=>{
    res.send("server is running")
})

const server = http.createServer(app)

const io = socket(server)

io.on("connection",(socket)=>{
    console.log("connection is on ");

    
    socket.on("joined",({user})=>{
        users[socket.id]=user
        console.log(`${user} has joined`);
        socket.broadcast.emit("userjoined",{user:"Admin", message:`${users[socket.id]} has joined`});
        socket.emit("welcome",{user:"Admin", message:`welcome to the chat,${users[socket.id]}`});
    })
    socket.on("message",({message, id})=>{
       io.emit("sendmessage",{user:users[socket.id], message,id})

    })
    socket.on('disconnected',()=>{
        socket.broadcast.emit("leave",{user:"admin",message:`${users[socket.id]} user has left`})
        console.log("user left")
    })


    })

server.listen(5000, ()=>{
    console.log("server is running ")
})
