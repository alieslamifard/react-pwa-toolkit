import Bowser from "bowser";

export default function Device () {
  return Bowser.parse(window.navigator.userAgent);
};
