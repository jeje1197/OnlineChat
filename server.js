const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'OnlineChat Bot'

// Run when client connects
io.on('connection', socket => {
    // Welcome current user (notifies only the user)
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'))

    // Broadcast when a user connects (notifies everyone but the user that connects)
    socket.broadcast.emit('message', formatMessage(botName,'A user has joined the chat'))

    // Runs when client disconnects (notifies eveyone)
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName,'A user has left the chat'))
    })

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('user', msg))
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`))