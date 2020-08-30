// node server.js

/*
Démarre le server node js
Initialise socket.io
Récupère la liste des ports
Tente d'ouvrir un port serie, sinon tempo pour récuperer la liste des ports ou reconnection automatique 
si le port est débranché (interet ne pas avoir a redémarrer le server node.js)
Lorsqu'un client se connecte, il doit avoir la possibilité de modifier le port serie.
*/

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
    // QUAND UN CLIENT SE CONNECTE
    // on le note dans la console
    console.log('Un client est connecté !');

    // On l'informe qu'il est connecté
    socket.emit('messageFromServer', 'Vous êtes connecté au serveur !');

    // Envoi l'état du port sérial au client
    socket.emit('messageFromServer', MessageOfSerialPort);

    // Attends la liste des ports séries
    async () => {
        mylistPorts = await listPorts();
        if (mylistPorts.state) {
            console.log('async')
            mylistPorts.infoSerialPort.forEach(port => {
                socket.emit('messageFromServer', 'Liste des ports séries : ' + port.path);
            })
        }
    }

    // On écoute les requetes du client et on envoie la commande à l'arduino
    socket.on('commande', function (action) {
        console.log('message du client : ' + action);
        ConnectSerialPort.write(action);
        socket.emit('messageFromServer', action);
    });

    // 
    socket.on('messageFromSerial', function (getForSerialPort) {
        if(getForSerialPort == 'getSerialPort')
        console.log('message du client : ' + getForSerialPort);

        let mylistPorts
        async () => {
            mylistPorts = await listPorts();
            if (mylistPorts.state) {
                //impossible d'envoyer via socket depuis fonction asyn
                // socket.emit('messageFromServer', '1-Liste des ports séries : ' + infoSerialPort[0].path);
                console.log('array : ' + test)
            }
        }
        socket.emit('messageFromServer', '2-Liste des ports séries : ' + infoSerialPort);
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
// PORT COM WINDOWS
// let PortCOM = "COM5";
// PORT COM RASPBERRY
// const PortCOM = "/dev/ttyACM0";

// let PortCOM =[];
// let listSerialPort = [];
let MessageOfSerialPort;
let infoSerialPort=[];
let IdForTempo = false;

// LISTE + INFOS DES PORTS SERIES, FONCTION ASYNCHRONE
function listPorts() {
    return SerialPort.list().then(
        ports => {
            if (ports.length > 0) {
                console.log('Listes des ports :');
                console.log(ports);
                infoSerialPort = ports;
                return {
                    'state': true,
                };
            } else {
                console.log('Aucun port série disponible ou non spécifié.');
                MessageOfSerialPort = 'Aucun port série disponible ou non spécifié.';
                detectSerialPort();
                return {
                    'state': false
                };
            }
        },
        err => {
            console.error('Error listing ports', err);
            return {
                'state': false
            };
        }
    )
}

// INITISALISE LE PORT SERIE
let ConnectSerialPort = (PortCOM) => {
    // todo envoyer la liste des ports serie pour la connection

    // INITIALISE LA COMMUNICATION 
    let serialPortForArduino = new SerialPort(PortCOM, {
        baudRate: 9600,
    });

    // PARAMETRAGE DES DONNEES RECUES VIA LE PORT SERIE (delimiter :  \n saut de ligne, \r retour chariot, \t tabulation "   ")  
    const parser = serialPortForArduino.pipe(new Readline({
        delimiter: '\n',
    }));

    // OUVERTURE DU PORT SERIE  
    serialPortForArduino.on('open', function () {
        MessageOfSerialPort = 'Le port serie ' + PortCOM + ' est ouvert.';
        console.log(MessageOfSerialPort);
        io.sockets.emit('messageFromServer', MessageOfSerialPort);
    });

    // ERREUR D'OUVERTURE DU PORT SERIE  
    serialPortForArduino.on('error', function () {
        MessageOfSerialPort = 'Erreur lors de l\'ouverture du port : ' + PortCOM + '.';
        console.error('Erreur lors de l\'ouverture du port : ' + PortCOM + '.');
        io.sockets.emit('messageFromServer', MessageOfSerialPort);
    });

    // FERMETURE DU PORT SERIE  
    serialPortForArduino.on('close', error => {
        MessageOfSerialPort = 'Le port serie ' + PortCOM + ' à été fermé.';
        console.log(MessageOfSerialPort);
        io.sockets.emit('messageFromServer', MessageOfSerialPort);
        // surveille la reconnection du port série
        detectSerialPort();
    });

    // AFFICHE LES DONNEES RECU VIA LE PORT SERIE
    parser.on('data', data => {
        infoSerailPort = data;
        console.log("Arduino émission de données :  " + data);
        io.sockets.emit('messageFromServer', "Arduino émission de données :  " + data);
    });
}

// FONCTION ASYNCHRONE ATTENDS LA LISTE PUIS SE CONNECTE AU PORT SERIE SI IL EXISTE.
async function asyncCall() {
    // Stop la detection des ports series
    clearInterval(IdForTempo);

    // Attends la liste des ports séries
    const updateListPorts = await listPorts();
    // Si des ports existent se connectent par défaut sur le première élément.
    if (updateListPorts.state) {
        ConnectSerialPort(infoSerialPort[0].path);
    }
}

// surveille la reconnection du port série
const detectSerialPort = () => {
    IdForTempo = setInterval(function () {
        asyncCall();
    }, 2000);
}

// FONCTION EXECUTE AU CHARGEMENT DU SCRIPT
asyncCall();