const origin = process.env.ORIGIN?.split(',') || "http://localhost:3000";

module.exports = function (server) {
    const io = require('socket.io')(server, {
        serveClient: false,
        cors: {
            origin,
            methods: ["GET", "POST"],
        }
    })

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    }
    );
}