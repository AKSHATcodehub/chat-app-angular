const cors = require('cors')
const express = require('express');
const app = express(); 
const httpServer = require('http').createServer(app);
app.use(cors())  
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
}); 

const port =  3000;  
 
let arrayOfClient = []

let userName = ""
 
let groupMembersArray = []

app.use(express.urlencoded({extended:false}));

app.use(express.json()); 
 
app.post('/login',(res,req,next)=>{
  console.log("loggoer details..",res.body);
})
 
app.get("/",(req,res)=>{
  res.send(arrayOfClient)
})  

io.on('connection', (socket) => {

  // socket.on("userexist",(data)=>{
  //   arrayOfClient.filer      
  // })

  

  socket.on('ehlo', function (data) {
    console.log("data", data);
    userName = data 
    arrayOfClient.push({ socketID: socket.id, name: data })
    console.log('a user connected', arrayOfClient);
    io.emit("array", arrayOfClient)
  });

  socket.on('message', (message, room) => {

    if (room == '') {
      socket.emit('message', message);
      console.log("room is nulllll..........");
    } else {
      io.to(room).emit('message', message)
      //changes ->  io.to(room).emit('message',message) to socket.to(room).emit('message',message)
      // but works same.....
      console.log("room id available.........");
    }
    console.log(message);

 
  });

  socket.on("typing",(data)=>{
    console.log(data,"is typing....");

  })

  socket.on("group create",(message)=>{
    arrayOfClient.push({socketID: null , name: message.name});
    io.emit("group create",arrayOfClient);
  })

  joinedUserArray=[]

  socket.on('join-room', (room,cb) => {

      groupMembersArray.push({roomName:room.name,members:[]})

      socket.join(room.name)
      
      joinedUserArray.push(`${room.personName} joined in ${room.name}.....`)

      // cb(joinedUserArray)
                         
      console.log("this is join room function called.....", room,arrayOfClient);
  
  })

  socket.on('group-chat', (message, room) => {

    console.log("group-chat ", message, room);
    io.in(room).emit("group-chat", message)
  })

  socket.on('disconnect', () => {
    arrayOfClient = arrayOfClient.filter((item) => {
      return socket.id != item.socketID
    })
    io.emit("array", arrayOfClient)

    console.log('a user disconnected!', arrayOfClient);
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`, arrayOfClient));

// const express = require('express');
// const app = express();
// const socket = require('socket.io');

// const server = app.listen(4000,function(){
//     console.log("listening on port 4000");
// }) 

// const io = socket(server);


// io.on('connection',function(socket){
//     console.log('made socket connection',socket.id);
// }) 
 


