import React, { useEffect } from "react";
import { render } from "react-dom";
import Device, { useNetwork, usePwa, useVisibility, useInstallPrompt } from "../../lib";

function Demo() {
    const isOnline = useNetwork();
    const isPwa = usePwa();
    const isVisible = useVisibility();
    const [installationStatus, installationEvent] = useInstallPrompt(true);
    const [deviceConfig, setDeviceConfig] = React.useState(null);

    useEffect(() => {
        // set device configuration in state just once.
        if (!deviceConfig) {
            setDeviceConfig(Device());
        }

        // Show Add-to-home-screen prompt, if user have it's condition.
        if(installationEvent) {
            installationEvent.prompt();
        }

        // installationStatus is one of these states: null/dismissed/accepted/installed
        if(installationStatus === 'accepted') {
            // User accept it. You can save it in some log with device config.
        }

        if (!isVisible) {
            alert('Now it is hidden.')
        }
    });

    return (
       <div>
           <h2>Demo page for react-pwa-toolkit</h2>
           <hr/>
           <p>1. You are <b>{isOnline ? 'online' : 'offline'}</b>. Turn off network and check me again.</p>
           <p>2. It is <b>{!isPwa && 'NOT'}</b> PWA</p>
           <p>3. It is <b>{isVisible ? 'visible' : 'hidden'}. I will show an alert when it be hidden.</b></p>
           <p>4. This is your device configuration:</p>
           <pre>{JSON.stringify(deviceConfig, undefined, 2)}</pre>
       </div>
    );
}

render(<Demo/>, document.getElementById("app"));
