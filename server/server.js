const path = require('path')
const http = require('http')
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newMessage', {
    from: 'Kole',
    text: 'See you then',
    createdAt: 2342
  })

  socket.emit('newEmail', {
    from: 'mike@gmail.com',
    text: 'Sup, what up?',
    createdAt: 143
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage: ', message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })
})


server.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
