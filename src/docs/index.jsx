import React, { useEffect } from "react";
import { render } from "react-dom";
import Device, { withDevice, useDevice } from "../../lib";
import "./styles.scss";

function Demo() {
    useEffect(() => {
        console.warn('##### Device : ', Device);
    });
    return (
       <div>Demo</div>
    );
}

render(<Demo/>, document.getElementById("app"));
