import React from 'react';
import ImageAvancer from './../../assets/images/avancer.png';
import ImageCentrer from './../../assets/images/centrer.png';
import ImageGauche from './../../assets/images/gauche.png';
import ImageDroite from './../../assets/images/droite.png';
import ImageReculer from './../../assets/images/reculer.png';
import ImageScanX from './../../assets/images/scanX.png';
import ImageScanY from './../../assets/images/scanY.png';

export default function CameraCommand() {
    return (
        <div class="col-6 order-3 col-xl-3 order-xl-3 d-flex flex-column align-items-center mt-2" id="container__boxCamera">
            <div class="boxTitleHaut">
                <h5 class="sousTitre text-center">Caméra</h5>
            </div>
            <div class="grid-containerCamera">
                <div class="camera-avt">
                    <img src={ImageAvancer} alt="" data-id="camera_Haut" class="icon" />
                </div>
                <div class="camera-centre">
                    <img src={ImageCentrer} alt="" data-id="camera_Centre" class="icon" />
                </div>
                <div class="camera-gauche">
                    <img src={ImageGauche} alt="" data-id="camera_Gauche" class="icon" />
                </div>
                <div class="camera-droite">
                    <img src={ImageDroite} alt="" data-id="camera_Droite" class="icon" />
                </div>
                <div class="camera-arr">
                    <img src={ImageReculer} alt="" data-id="camera_Bas" class="icon" />
                </div>
                <div class="camera-scanGauche">
                    <img src={ImageScanX} alt="" data-id="camera_Scan-X" class="icon" />
                </div>
                <div class="camera-scanDroite">
                    <img src={ImageScanY} alt="" data-id="camera_Scan-Y" class="icon" />
                </div>
            </div>
            <div class="boxTitleBas">
                <h5 class="sousTitre text-center">Commandes caméra</h5>
            </div>
        </div>
    );
}
