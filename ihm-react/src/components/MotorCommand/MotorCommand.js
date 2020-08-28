import React, { useState } from 'react';
import ImageAvancer from './../../assets/images/avancer.png';
import ImageHautGauche from './../../assets/images/hautGauche.png';
import ImageHautDroite from './../../assets/images/hautDroite.png';
import ImageCentrer from './../../assets/images/centrer.png';
import ImageGauche from './../../assets/images/gauche.png';
import ImageDroite from './../../assets/images/droite.png';
import ImageReculer from './../../assets/images/reculer.png'; 
import ImageBasGauche from './../../assets/images/basGauche.png';
import ImageBasDroite from './../../assets/images/basDroite.png';

import { imagesData } from './../../helpers/imagesData';

export default function MotorCommand({ showMotorCommand }) {
    const [sliderValue, setSliderValue] = useState(175);
    const [action, setAction] = useState('');
    const [hoverImage,setHoverImage] = useState('');

    function handleOnSliderValueChange(event) {
        setSliderValue(event.target.value);
        console.log('MotorCommand.js : ', sliderValue);
    }

    function handleOnActionButtonClick(actionType) {
        setAction(actionType);
        console.log('Action type : ', actionType);
    }

    function handleOnImageMouse(event) {
        setHoverImage(event.target.value);
        console.log('change image : ', hoverImage);
    }
    
    
    return (
        <div className={`col-6 order-2 col-xl-3 order-xl-1 d-flex flex-column align-items-center mt-2 ${showMotorCommand}`} id="container__boxMoteur">
            <div className="boxTitleHaut">
                <h5 className="sousTitre text-center">Commandes moteurs</h5>
            </div>

            <div className="grid-containerMoteurs">
                <div className="moteurs-avt" onClick={() => {handleOnActionButtonClick("MotorForward")}}>
                    <img src={ImageAvancer} alt="" data-id="moteur_Avancer" class="icon" />
                </div>
                <div className="moteurs-avtgauche">
                    <img src={ImageHautGauche} alt="" data-id="moteur_AvGauche" class="icon" />
                </div>
                <div className="moteurs-avtDroite">
                    <img src={ImageHautDroite} alt="" data-id="moteur_AvDroite" class="icon" />
                </div>
                <div className="moteurs-ct">
                    <img src={ImageCentrer} alt="" data-id="moteur_Stop" class="icon" />
                </div>
                <div className="moteurs-ctGauche">
                    <img src={ImageGauche} alt="" data-id="moteur_Gauche" class="icon" />
                </div>
                <div className="moteurs-ctDroite">
                    <img src={ImageDroite} alt="" data-id="moteur_Droite" class="icon" />
                </div>
                <div className="moteurs-ar">
                    <img src={ImageReculer} alt="" data-id="moteur_Reculer" class="icon" />
                </div>
                <div className="moteurs-arGauche">
                    <img src={ImageBasGauche} alt="" data-id="moteur_ArGauche" class="icon" />
                </div>
                <div className="moteurs-arDroite">
                    <img src={ImageBasDroite} alt="" data-id="moteur_ArDroite" class="icon" />
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
                            value={sliderValue}
                            defaultValue={sliderValue}
                            onChange={handleOnSliderValueChange}
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