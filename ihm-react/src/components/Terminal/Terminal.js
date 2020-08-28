// auto complétion composants react
// rfc ou rfce
import React, { useRef, useEffect } from 'react';

export default function Terminal({started, messageFromServer}) {    
    const messagesList = messageFromServer.map((message, index) => (
        <div key={index}>{ message }</div>
    ));
    
    return (
        <div className="col-12 order-1 col-xl-6 order-xl-2 d-flex flex-column pr-1 pr-md-0">
            <div className="commande-camera d-flex">
                {/* <iframe id="rpiCam" src="http://10.3.141.1/RpiCam/min.php" allow="fullscreen" class={started}></iframe> */}
            </div>
            
            <div className="infoConsole infoConsole__bas--height">
                <div className="infoConsole__titre infoConsole__titre__serialPort--bRadius">
                    Message
                </div>
            <div className="terminal terminal-serialPort" id="dataSerialPort" >{ messagesList }</div>
            </div>
        </div>
    );
};

// src="http://10.3.141.1/RpiCam/min.php"
// page vide : "about:blank"