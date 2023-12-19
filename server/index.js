const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');

const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messagesRoutes')

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

//sending all 'api/auth' routes to userRoutes
app.use('/api/auth', userRoutes);

app.use('/api/messages',messageRoutes)


mongoose.connect(process.env.MONGO_URL, {
    useNewURLparser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log("DB Connection Successfull.")
}).catch((error) => {
    console.log(error.message)
})

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`server started on PORT ${port}`)
})

const io = socket(server, {
    cors: {
        origin:"http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    // console.log("A user connected to: ",socket.id)
    global.chatSocket = socket;
    socket.on("add-user",(userId)=> {
        onlineUsers.set(userId, socket.id);
    });
    socket.on('send-msg', (data) =>{
        console.log(data);
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-receive', data.message);
        }
    });
});