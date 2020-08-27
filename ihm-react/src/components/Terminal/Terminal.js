// auto complétion composants react
// rfc ou rfce
import React, {useState, useEffect} from 'react';

export default function Terminal() {
    const [started, setStarted] = useState('');

    useEffect(()=> {
        setStarted('started');
    },[]);

    return (
        <div class="col-12 order-1 col-xl-6 order-xl-2 d-flex flex-column pr-1 pr-md-0">
            <div class="commande-camera">
                <iframe id="rpiCam" src="http://10.3.141.1/RpiCam/min.php" class={started}></iframe>
            </div>
            
            <div class="infoConsole infoConsole__bas--height">
                <div class="infoConsole__titre infoConsole__titre__serialPort--bRadius">
                    Port série
                </div>
                <div class="terminal terminal-serialPort" id="dataSerialPort"></div>
            </div>
        </div>
    );
};