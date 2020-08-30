import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import ConsoleModal from './components/ConsoleModal/ConsoleModal';
import communicationImage from './assets/images/communication.png';
import Terminal from './components/Terminal/Terminal';
import MotorCommand from './components/MotorCommand/MotorCommand';
import CameraCommand from './components/CameraCommand/CameraCommand';

const ENDPOINT = '//:8080/';

function App() {
  const [showConsoleModal, setShowConsoleModal] = useState(false);
  const [started, setStarted] = useState('');
  const [showMotorCommand, setShowMotorCommand] = useState('hidden');
  const [showCameraCommand, setShowCameraCommand] = useState('hidden');

  const [messageFromServer, setMessageFromServer] = useState([]);
  const [messageFromSerial, setMessageFromSerial] = useState([]);

  const [action, setAction] = useState('');

  useEffect(()=> {
    const socket = socketIOClient(ENDPOINT);

    socket.on('messageFromServer', message => {
      setMessageFromServer((previousState) => ([...previousState, message]));
    });

    socket.on('messageFromSerial', message => {

    });

    socket.emit('messageFromSerial', "getSerialPort");

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  },[]);

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
    <div class="background bgImage"></div>
    <div class="background bgColor--black-transparency"></div>

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
        <Terminal started={started} messageFromServer={messageFromServer}/>
        {/* <!-- Commandes moteurs --> */}
        <MotorCommand showMotorCommand={showMotorCommand} setAction={setAction} />
        {/* <!-- Commandes caméra --> */}
        <CameraCommand showCameraCommand={showCameraCommand} />
      </div>
    </div>
  </>  
  );
}
export default App;
