import React from "react";
import Bowser from "bowser";

const Device = () => {
  const spec = Bowser.parse(window.navigator.userAgent);
  return spec;
};

Device.propTypes = {};

Device.defaultProps = {};

export default Device;
