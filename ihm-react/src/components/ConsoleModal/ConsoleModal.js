import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

function ConsoleModal({showConsoleModal, handleCloseConsoleModal, communicationImage}) {
    return (
        <Modal
            show={showConsoleModal}
            onHide={handleCloseConsoleModal}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Exécution d'une action</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <Image src ="communication.png" /> */}
                <img src={communicationImage} alt="Communication" width="100%" />
                <p>
                    <span className="font-weight-bold">Actions</span><br/>
                    Déplacement (action + vitesse) : MotorsFrontLeft, MotorsForward,MotorsFrontRight, MotorsLeft, MotorsStop, MotorsRight, MotorsBackLeft, MotorsBackward, MotorsBackRight <br/>
                    Caméra : CamUp CamLeft, CamCenter, CamRight, CamDown, CamScanX, CamScanY <br/>
                    Vitesse : de 0 à 255 <br/><br/>
                    Commande : action + ";" + optionnel(vitesse) <br/>
                </p>
                <label for="infoAction">Console : </label>
                <input type="text" className="infoAction ml-2" id="infoAction" placeholder="ex : MotorsForward;255" />
                <Button variant="primary" className="ml-2">Executer</Button>
            </Modal.Body>
            <Modal.Footer>
            {/* <button className="btn btn-primary"></button> */}
            <Button variant="primary"  onClick={handleCloseConsoleModal}>
                Fermer
            </Button>
            </Modal.Footer>
        </Modal>        
    );
}

export default ConsoleModal;