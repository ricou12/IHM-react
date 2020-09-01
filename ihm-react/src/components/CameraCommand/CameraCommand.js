import React from 'react';
import ImageAvancer from './../../assets/images/avancer.png';
import ImageCentrer from './../../assets/images/centrer.png';
import ImageGauche from './../../assets/images/gauche.png';
import ImageDroite from './../../assets/images/droite.png';
import ImageReculer from './../../assets/images/reculer.png';
import ImageScanX from './../../assets/images/scanX.png';
import ImageScanY from './../../assets/images/scanY.png';

export default function CameraCommand({showCameraCommand, handleCommandData}) {
    return (
        <div className={`col-6 order-3 col-xl-3 order-xl-3 d-flex flex-column align-items-center mt-2 ${showCameraCommand}`} id="container__boxCamera">
            <div className="boxTitleHaut">
                <h5 className="sousTitre text-center">Caméra</h5>
            </div>
            <div className="grid-containerCamera">
                <div className="camera-avt">
                    <img src={ImageAvancer} alt="" data-id="camera_Haut" className="icon" onClick = {()=> handleCommandData(`CamUp;\n`) } />
                </div>
                <div className="camera-centre">
                    <img src={ImageCentrer} alt="" data-id="camera_Centre" className="icon" onClick = {()=> handleCommandData(`CamCenter;\n`) }/>
                </div>
                <div className="camera-gauche">
                    <img src={ImageGauche} alt="" data-id="camera_Gauche" className="icon" onClick = {()=> handleCommandData(`CamLeft;\n`) }/>
                </div>
                <div className="camera-droite">
                    <img src={ImageDroite} alt="" data-id="camera_Droite" className="icon" onClick = {()=> handleCommandData(`CamRight;\n`) }/>
                </div>
                <div className="camera-arr">
                    <img src={ImageReculer} alt="" data-id="camera_Bas" className="icon" onClick = {()=> handleCommandData(`CamDown;\n`) }/>
                </div>
                <div className="camera-scanGauche">
                    <img src={ImageScanX} alt="" data-id="camera_Scan-X" className="icon" onClick = {()=> handleCommandData(`CamScanX;\n`) }/>
                </div>
                <div className="camera-scanDroite">
                    <img src={ImageScanY} alt="" data-id="camera_Scan-Y" className="icon" onClick = {()=> handleCommandData(`CamScanY;\n`) }/>
                </div>
            </div>
            <div className="boxTitleBas">
                <h5 className="sousTitre text-center">Commandes caméra</h5>
            </div>
        </div>
    );
}
