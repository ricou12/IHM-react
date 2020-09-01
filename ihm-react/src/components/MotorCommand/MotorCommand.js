import React, { useState, useEffect } from 'react';
import ImageAvancer from './../../assets/images/avancer.png';
import ImageHautGauche from './../../assets/images/hautGauche.png';
import ImageHautDroite from './../../assets/images/hautDroite.png';
import ImageCentrer from './../../assets/images/centrer.png';
import ImageGauche from './../../assets/images/gauche.png';
import ImageDroite from './../../assets/images/droite.png';
import ImageReculer from './../../assets/images/reculer.png';  
import ImageBasGauche from './../../assets/images/basGauche.png';
import ImageBasDroite from './../../assets/images/basDroite.png';

// import { imagesData } from './../../helpers/imagesData';

export default function MotorCommand({ showMotorCommand,setToogleAction,setActionMoteurs,setSpeed }) {

    function handleOnSliderValueChange(value) {
        setSpeed(value);
    }
    
    // Commandes moteurs
    function handleOnActionButtonClick(actionType) {
        setActionMoteurs(actionType);
    }
    
    return (
        <div className={`col-6 order-2 col-xl-3 order-xl-1 d-flex flex-column align-items-center mt-2 ${showMotorCommand}`} id="container__boxMoteur">
            <div className="boxTitleHaut">
                <h5 className="sousTitre text-center">Commandes moteurs</h5>
            </div>

            <div className="grid-containerMoteurs">
                <div className="moteurs-avt" onClick={() => handleOnActionButtonClick("MotorsForward")}>
                    <img src={ImageAvancer} alt="" data-id="moteur_Avancer" className="icon" />
                </div>
                <div className="moteurs-avtgauche" onClick={() => handleOnActionButtonClick("MotorsFrontLeft")}>
                    <img src={ImageHautGauche} alt="" data-id="moteur_AvGauche" className="icon" />
                </div>
                <div className="moteurs-avtDroite" onClick={() => handleOnActionButtonClick("MotorsFrontRight")}>
                    <img src={ImageHautDroite} alt="" data-id="moteur_AvDroite" className="icon" />
                </div>
                <div className="moteurs-ct" onClick={() => handleOnActionButtonClick("MotorsStop")}>
                    <img src={ImageCentrer} alt="" data-id="moteur_Stop" className="icon" />
                </div>
                <div className="moteurs-ctGauche" onClick={() => handleOnActionButtonClick("MotorsLeft")}>
                    <img src={ImageGauche} alt="" data-id="moteur_Gauche" className="icon" />
                </div>
                <div className="moteurs-ctDroite" onClick={() => handleOnActionButtonClick("MotorsRight")}>
                    <img src={ImageDroite} alt="" data-id="moteur_Droite" className="icon" />
                </div>
                <div className="moteurs-ar" onClick={() => handleOnActionButtonClick("MotorsBackward")}>
                    <img src={ImageReculer} alt="" data-id="moteur_Reculer" className="icon" />
                </div>
                <div className="moteurs-arGauche" onClick={() => handleOnActionButtonClick("MotorsBackLeft")}>
                    <img src={ImageBasGauche} alt="" data-id="moteur_ArGauche" className="icon" />
                </div>
                <div className="moteurs-arDroite" onClick={() => handleOnActionButtonClick("MotorsBackRight")}>
                    <img src={ImageBasDroite} alt="" data-id="moteur_ArDroite" className="icon" />
                </div>
                <div className="moteurs-vitesse rounded border border-dark d-flex flex-column align-items-center justify-content-around">
                    <div className="font-weight-bold mb-2">Vitesse</div>
                    <div className="slider-wrapper slider p-2">
                        <input 
                            type="range" 
                            className="slider-moteurs" 
                            min="105" 
                            max="255" 
                            step="10" 
                            defaultValue={175}
                            onChange={event=>handleOnSliderValueChange(event.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="boxTitleBas">
                <h5 className="sousTitre text-center">Commandes moteurs</h5>
            </div>
        </div>
    );
}

