const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
// Activation du CORS pour autoriser les requêtes depuis http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Création du serveur HTTP en utilisant l'application Express
const server = http.createServer(app);

// Configuration du serveur WebSocket (Socket.io)
const io = new Server(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

const apiNews = require('./routes/apiNews');
const scraping = require('./routes/scraping');
const service = require('./services/apiNewsService');

app.use('/news', apiNews);
app.use('/scraping', scraping);

// Événement déclenché lorsqu'un client se connecte au serveur WebSocket
io.on('connection', (socket) => {

    console.log('New client connected');

    setInterval(soketemitData, 60000);

});

// Fonction pour émettre les données actualisées aux clients via WebSocket
async function soketemitData() {
    const data = await service.getall();
    io.emit('dataUpdate', data)
    console.log('update');
}

app.use(express.json());

const port = process.env.PORT || 5000;

server.listen(port, () => {

    console.log("serveur est en ligne !")
}); 