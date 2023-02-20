import express from 'express'
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')

app.use('/', viewsRouter)

const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando al puerto ${PORT}`);
})

export const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log(`Cliente conectado con el ID ${socket.id}`)
    socket.emit('fetchProducts')
    socket.on('updateProducts', () => {
        socket.emit('fetchProducts')
    })
})