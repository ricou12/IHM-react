import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import CommunicationImage from './../../assets/images/communication.png';

function ConsoleModal({showConsoleModal, handleCloseConsoleModal}) {
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
                <img src={CommunicationImage} alt="Communication" width="100%" />
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
                Annuler
            </Button>
            </Modal.Footer>
        </Modal>        
    );
}

export default ConsoleModal;

{/* <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog  modal-lg" role="document">
        <div class="modal-content colorDark text-white">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Exécution d'une action</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>       
        </div>
        <div class="modal-body">
            <img src="/images/communication.png" alt="Communication" width="100%" />
            <p>
            <span class="font-weight-bold">Actions</span><br/>
            Déplacement (action + vitesse) : MotorsFrontLeft, MotorsForward,MotorsFrontRight, MotorsLeft, MotorsStop, MotorsRight, MotorsBackLeft, MotorsBackward, MotorsBackRight <br/>
            Caméra : CamUp CamLeft, CamCenter, CamRight, CamDown, CamScanX, CamScanY <br/>
            Vitesse : de 0 à 255 <br/><br/>
            Commande : action + ";" + optionnel(vitesse) <br/>
            </p>
            <label for="infoAction">Console : </label>
            <input type="text" class="infoAction" id="infoAction" placeholder="ex : MotorsForward;255" />
            <button class="btn btn-primary execAction">Executer</button>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        </div>
        </div>
    </div>
</div> */}