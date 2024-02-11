const socketUserMap = {} // no support for exisiting connection in case of server restart .. need to use something stateful

const webRTCListeners =  (socket,io) =>{
    socket.on("join",({roomId,user})=>{
        socketUserMap[socket.id] = user;
        const socketClients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        socketClients.forEach(clientId => {
            io.to(clientId).emit("addPeer",{peerId:socket.id,createOffer:false,user})
            socket.emit("addPeer",{peerId:clientId,createOffer:true,user:socketUserMap[clientId]})
        })
        socket.join(roomId);
    })

    socket.on("relayIce",({peerId, icecandidate})=>{
        io.to(peerId).emit("newIce",{peerId:socket.id,icecandidate})
    })

    socket.on("relaySDP",({peerId,SDP})=>{
        io.to(peerId).emit("SDP",{peerId:socket.id,SDP})
    })

    socket.on("mute",({userId,muteState,roomId})=>{
        io.to(roomId).emit("mute",{userId,muteState})})
        

    const leaveRoom = ()=>{
        const {rooms} = socket;
        Array.from(rooms || []).forEach((roomId)=>{
            const clients = Array.from(io.sockets.adapter.rooms.get(roomId)|| [])
            // console.log(socketUserMap)
            clients.forEach(clientId =>{io.to(clientId).emit("removePeer",{peerId:socket.id,userId:socketUserMap[socket.id]?._id});
            socket.emit("removePeer",{peerId:clientId,userId:socketUserMap[clientId]?._id})
        })
        socket.leave(roomId);
        // console.log((io.sockets.adapter.rooms))
            
        }) ;
        delete socketUserMap[socket.id]
    }
    socket.on("leave",leaveRoom);
    socket.on('disconnecting',leaveRoom)
}

module.exports = webRTCListeners;