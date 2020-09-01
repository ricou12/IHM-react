import React, { useState, useEffect } from 'react';
import ConsoleModal from './components/ConsoleModal/ConsoleModal';
import communicationImage from './assets/images/communication.png';
import Terminal from './components/Terminal/Terminal';
import MotorCommand from './components/MotorCommand/MotorCommand';
import CameraCommand from './components/CameraCommand/CameraCommand';

import io from 'socket.io-client';
// Port de communication HTTP via les sockets
const socket = io('//:8080');

function App() {

  // SHOW MODAL WHEN CLICK ON TITLE
  const [showConsoleModal, setShowConsoleModal] = useState(false);

  // ANIMATION
  const [started, setStarted] = useState('');
  const [showMotorCommand, setShowMotorCommand] = useState('hidden');
  const [showCameraCommand, setShowCameraCommand] = useState('hidden');
  // WEB SOKET
  const [messageFromServer, setMessageFromServer] = useState([]);

  // COMMANDES MOTEURS : 'action' ';' + 'vitesse' + '\n'
  const [actionMoteurs, setActionMoteurs] = useState('');
  const [actionServoMoteurs, setActionServoMoteurs] = useState('');
  const [speed, setSpeed] = useState(175);

  useEffect(() => {
    if (actionMoteurs !== '') {
      socket.emit('commande', `${actionMoteurs};${speed}\n`);
    }
  }, [actionMoteurs,speed])

  useEffect(() => {
    if (actionServoMoteurs !== '') {
      socket.emit('commande', `${actionServoMoteurs};\n`);
    }
    return () => {
      setActionServoMoteurs('');
    }
  }, [actionServoMoteurs])

  useEffect(() => {
    socket.on('messageFromServer', message => {
      setMessageFromServer((previousState) => ([...previousState, message]));
    });
  }, []); //only re-run the effect if new message comes in


  // Effets au chargement de l'interface
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
 

  // MODAL DE BOOTSTRAP (Handle === Manipuler)
  function handleShowConsoleModal() {
    setShowConsoleModal(true);
  };
  // MODAL DE BOOTSTRAP
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
          setActionMoteurs={setActionMoteurs}
          setSpeed={setSpeed}
          
        />
        {/* <!-- Commandes caméra --> */}
        <CameraCommand 
          showCameraCommand={showCameraCommand} 
          setActionServoMoteurs={setActionServoMoteurs}
        />
      </div>
    </div>
  </>  
  );
}
export default App;
