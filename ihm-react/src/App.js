import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import ConsoleModal from './components/ConsoleModal/ConsoleModal';
import communicationImage from './assets/images/communication.png';
import Terminal from './components/Terminal/Terminal';
import MotorCommand from './components/MotorCommand/MotorCommand';
import CameraCommand from './components/CameraCommand/CameraCommand';

// Port de communication HTTP via les sockets
const ENDPOINT = '//:8080/';

function App() {
  let socket;
   const [showConsoleModal, setShowConsoleModal] = useState(false);
  const [started, setStarted] = useState('');
  // ANIMATION
  const [showMotorCommand, setShowMotorCommand] = useState('hidden');
  const [showCameraCommand, setShowCameraCommand] = useState('hidden');
  // WEB SOKET
  const [initialized, setInitialized] = useState(false);
  const [messageFromServer, setMessageFromServer] = useState([]);
  const [messageFromSerial, setMessageFromSerial] = useState([]);
  // Commandes moteurs et servo moteurs : 'action' ';' + 'vitesse' + '\n'
  const [action, setAction] = useState('');
  const [speed, setSpeed] = useState(175);

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    socket.on('messageFromServer', message => {
        setMessageFromServer((previousState) => ([...previousState, message]));
    });

    return () => socket.disconnect();
  },[]);
  
  useEffect(()=> {
    if (action !== '') {
      handleCommandData(`${action};${speed}/n`);
    }
  }, [action, speed]);

  function handleOnSpeedChange(value) {
    setSpeed(value);
  }

  // Commandes moteurs
  function handleOnActionButtonClick(actionType) {
    setAction(actionType);
  }
      
  const handleCommandData = (command) => {
    // socket.emit('commande', `${action};${speed}\n`);
    // camera: `${action};''\n`
    socket.emit('commande', command);
  }

  const createSocketConnection = () => {
    socket.on('messageFromServer', message => {
      setMessageFromServer((previousState) => ([...previousState, message]));
    });
    setInitialized(true);
  }

  useEffect(()=> {
    setStarted('started');
  },[]);

  // TODO useEffect pour basculer la classe hidden <> afficher
  useEffect(() => {
    setTimeout(()=>{
      setShowMotorCommand('showAndZoom');
      setTimeout(()=>{
        setShowCameraCommand('showAndZoom');
      }, 500);
    }, 1000);
  },[]);
 
  // Handle === Manipuler
  function handleShowConsoleModal() {
    setShowConsoleModal(true);
  };

  function handleCloseConsoleModal() {
    setShowConsoleModal(false);
  };
 
  return (
    <>
    {/*  Background fixed full size */}
    <div className="background bgImage"></div>
    <div className="background bgColor--black-transparency"></div>

    <div className="container-fluid">
      {/* Titre + modal */}
      <div className="row">
        <div className="col-12">
          {/* Button trigger modal */}
          <div className="box-title d-flex justify-content-center pt-2">
            <h1 className="title text-center" onClick={handleShowConsoleModal}>
              IHM - Télécommande
            </h1>
            <ConsoleModal 
              communicationImage = {communicationImage}
              showConsoleModal={showConsoleModal}
              handleCloseConsoleModal={handleCloseConsoleModal}
            />
          </div>
        </div>       
      </div>

      <div className={`row no-gutters ${started}`} id="myConsole">
        {/* <!-- Terminal --> */}
        <Terminal 
          started={started} 
          messageFromServer={messageFromServer}
          />
        {/* <!-- Commandes moteurs --> */}
        <MotorCommand 
          showMotorCommand={showMotorCommand}  
          handleCommandData={handleCommandData}
          handleOnSpeedChange={handleOnSpeedChange}
          handleOnActionButtonClick={handleOnActionButtonClick}
        />
        {/* <!-- Commandes caméra --> */}
        <CameraCommand showCameraCommand={showCameraCommand} />
      </div>
    </div>
  </>  
  );
}
export default App;
