import React, { useState } from 'react';
import ConsoleModal from './components/ConsoleModal/ConsoleModal';
// import logo from './logo.svg';
// import './App.css';

function App() {
  const [showConsoleModal, setShowConsoleModal] = useState(false);
  const handleShowConsoleModal = () => setShowConsoleModal(true);
  const handleCloseConsoleModal = () => setShowConsoleModal(false);

  return (
    <div className="container-fluid">
      {/* Titre +console */}
      <div className="row">
        <div className="col-12">
          {/* Button trigger modal */}
          <div className="box-title d-flex justify-content-center pt-2">
            <h1 className="title text-center" onClick={handleShowConsoleModal}>
              IHM - Télécommande
            </h1>
            <ConsoleModal 
              showConsoleModal={showConsoleModal} 
              handleCloseConsoleModal={handleCloseConsoleModal} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
