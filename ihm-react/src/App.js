import React, { useState, useEffect } from 'react';
import ConsoleModal from './components/ConsoleModal/ConsoleModal';
import communicationImage from './assets/images/communication.png';
import Terminal from './components/Terminal/Terminal';
import MotorCommand from './components/MotorCommand/MotorCommand';
import CameraCommand from './components/CameraCommand/CameraCommand';

function App() {
  const [showConsoleModal, setShowConsoleModal] = useState(false);
  const [showCommand, setShowCommand] = useState("cacher");

  // TODO useEffect pour basculer la classe cacher <> dérouler
  useEffect(()=> {
    // Appliquer la logique ici

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
      {/* Titre + console */}
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

      <div class="row no-gutters" id="myConsole">
        {/* <!-- Terminal --> */}
        <Terminal />
        {/* <!-- Commandes moteurs --> */}
        <MotorCommand showCommand={showCommand} />
        {/* <!-- Commandes caméra --> */}
        <CameraCommand />
      </div>
    </div>
  </>  
  );
}
export default App;
