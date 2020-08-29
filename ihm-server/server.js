// node server.js

/* *******************************************************************
  INITIALISATION DES VARIABLES 
******************************************************************* */
let express = require('express'),
    SerialPort = require('serialport'),
    Readline = require('@serialport/parser-readline');

/* *******************************************************************
  FRAMEWORK STANDARD POUR LE DEVELOPPEMENT DE SERVEUR EN NODE.JS
******************************************************************* */
// https://www.npmjs.com/package/express || http://expressjs.com/
let app = express();
var port = 8080;

// DESACTIVATION DU PROTOCOLE CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

// ------- GESTION DES ROUTES ---------
// Chargement de la page
app.get('/', function (req, res) {
    res.json('Vous êtes bien connecté.');
});

const myserver = app.listen(port, function () {
    console.log('Connection avec le server établit : IP pour l\'interface de commande http://10.3.141.1:' + port + ' !');
});


/* *******************************************************************
                            SOCKET.IO
******************************************************************* */
// Chargement de socket.io
let io = require('socket.io')(myserver);
// let infoServer = "";

io.sockets.on('connection', function (socket) {
    // Quand un client se connecte, on le note dans la console
    console.log('Un client est connecté !');

    // Quand un client se connecte, on envoie un message
    socket.emit('messageFromServer', 'Vous êtes connecté au serveur !');
    // Envoi l'état du port sérial au client
    socket.emit('messageFromServer', infoSerialPort);

    // On écoute les requetes du client et on envoie la commande à l'arduino
    socket.on('commande', function (action) {
        console.log('message du client : ' + action);
        ConnectSerialPort.write(action);
        socket.emit('messageFromServer', action);
    });
});

/*
// Remove the socket when it closes
io.sockets.on('close', function () {
    console.log('socket', socketId, 'closed');
    socket.emit('messageFromServer','Fermeture du server !');
    delete io.sockets[socketId];
});

// Close the server
myserver.close(function () { console.log('Server closed!'); });
// Destroy all open sockets
for (var socketId in io.sockets) {
  console.log('socket', socketId, 'destroyed');
  io.sockets[socketId].destroy();
}
*/

//FERMETURE DU SERVER
//  process.exit(2);
/* *******************************************************************
                            SERIAL PORT
******************************************************************* */
// LIBRAIRIE POUR COMMUNIQUER PORT SERIE (Node SerialPort)
// https://serialport.io/
let infoSerialPort = "";
// PORT COM WINDOWS
// let PortCOM = "COM5";
// PORT COM RASPBERRY
// const PortCOM = "/dev/ttyACM0";

let PortCOM = "";
let listSerialPort;

// LISTE + INFOS DES PORTS SERIES, FONCTION ASYNCHRONE
function listPorts() {
    return SerialPort.list().then(
        ports => {
            listSerialPort = ports;
            if (ports.length > 0) {
                console.log('Listes des ports :');
                ports.forEach(port => {
                    console.log(`${port.path}\t${port.pnpId || ''}\t${port.manufacturer || ''}\t${port.locationId}`);

                    PortCOM = port.path;
                })
                return true;
            } else {
                // console.error('Aucun port détecté ou non spécifié.');
                return false;
            }
        },
        err => {
            console.error('Error listing ports', err);
            return false;
        }
    )
}

// FONCTION ASYNCHRONE ATTENDS LA LISTE DES PORTS PUIS OUVRE  LE PORT SERIE
async function asyncCall() {
    if (await listPorts()) {

        // INITIALISE LA COMMUNICATION 
        let ConnectSerialPort = new SerialPort(PortCOM, {
            baudRate: 9600,
        });

        // PARAMETRAGE DES DONNEES RECUES VIA LE PORT SERIE (delimiter :  \n saut de ligne, \r retour chariot, \t tabulation "   ")  
        const parser = ConnectSerialPort.pipe(new Readline({
            delimiter: '\n',
        }));

        // OUVERTURE DU PORT SERIE  
        ConnectSerialPort.on('open', function () {
            infoSerialPort = 'Le port serie ' + PortCOM + ' est ouvert.';
            console.log(infoSerialPort);
        });

        // ERREUR D'OUVERTURE DU PORT SERIE  
        ConnectSerialPort.on('error', function () {
            infoSerialPort = 'Erreur lors de l\'ouverture du port : ' + PortCOM + '.';
            console.error('Erreur lors de l\'ouverture du port : ' + PortCOM + '.');
        });

        // FERMETURE DU PORT SERIE  
        ConnectSerialPort.on('close', error => {
            infoSerialPort = 'Le port serie ' + PortCOM + ' à été fermé.';
            console.log(infoSerialPort + error.message);
            io.sockets.emit('messageFromServer', infoSerialPort + error.message);
        });

        /*
        // attend une séquence d'octets "prêts" avant d'émettre. 
        parser.on('ready', () => {
            infoSerailPort = 'the ready byte sequence has been received';
            console.log('the ready byte sequence has been received');
            io.sockets.emit('messageFromServer', infoSerailPort);
        });
        */

        // AFFICHE LES DONNEES RECU VIA LE PORT SERIE
        parser.on('data', data => {
            infoSerailPort = data;
            console.log("Arduino émission de données :  " + data);
            io.sockets.emit('messageFromServer', "Arduino émission de données :  " + data);
        });
    } else {
        console.log('Aucun port détecté ou non spécifié.');
    }
}


asyncCall();