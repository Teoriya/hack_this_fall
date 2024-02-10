const origin = process.env.ORIGIN?.split(',') || "http://localhost:3000";
const {ChangeSet, Text} = require("@codemirror/state")

let rooms = {};

module.exports = function (server) {
    const io = require('socket.io')(server, {
        serveClient: false,
        cors: {
            origin,
            methods: ["GET", "POST"],
        }
    })

    io.on('connection', (socket) => {
        socket.on("fetch",({roomId})=>{
            console.log(roomId)
            if(!rooms[roomId]){
                rooms[roomId]={
                    doc:(Text.of(["Jai Shree Ram"])),
                    updates:[],
                };
            }
            socket.emit("pull",{version:rooms[roomId].updates.length,code:rooms[roomId].doc.toString()})
            console.log(rooms)

        })
    
        socket.on("push",({version,roomId,newUpdates})=>{
            console.log("push",version,roomId,newUpdates)
            if(!rooms[roomId])return console.warn("Invalid Websocket Request : Invalid Roomid");
            if (rooms[roomId].updates.length != version) return;
            for (let update of newUpdates){
                let changes = ChangeSet.fromJSON(update.changes)
                rooms[roomId].updates.push({changes,clientID:update.clientID})
                rooms[roomId].doc = changes.apply(rooms[roomId].doc)
            }
            io.to(roomId).emit("sync",{newVersion:rooms[roomId].updates.length, updates:rooms[roomId].updates})
    
        })
        socket.on('join', function ({roomId}) {
            console.log("join",roomId)
            socket.join(roomId);
        });
        
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    }
    );
}