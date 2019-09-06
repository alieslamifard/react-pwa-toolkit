## React-pwa-toolkit
Most common PWA helpers in one toolkit. [Powered by Hooks](https://reactjs.org/docs/hooks-intro.html)

Don't hesitate to support the project on Github if you like it ❤️ Also, contributors are always welcome!

This is ONLY **[1kB](#1589F0)** with gzip.  
[LIVE DEMO](https://alieslamifard.github.io/react-pwa-toolkit/)
# Overview

The library is made to help to detect what browser your user has and gives you a convenient API to access user behave and most useful device events.

# Use cases

First of all, install it and require the library. This is a React Module.
```
npm installgi  react-pwa-toolkit
```
```javascript
import React from "react";
import Device, { useNetwork, usePwa, useVisibility, useInstallPrompt } from "react-pwa-toolkit";
```

## Browser detection

Use it inside useEffect.
```javascript
useEffect(() => {
    console.log(Device());
})
```
It will be something like:
```javascript
{
  "browser": {
    "name": "Safari",
    "version": "11.0"
  },
  "os": {
    "name": "iOS",
    "version": "11.0"
  },
  "platform": {
    "type": "mobile",
    "vendor": "Apple",
    "model": "iPhone"
  },
  "engine": {
    "name": "WebKit",
    "version": "604.1.38"
  }
}
```

## Network Status
If network is available, isOnline will be true. (default: true)
```javascript
const isOnline = useNetwork(); // true/false
```

## PWA Status
Check user is using PWA or it is a browser.
```javascript
const isPwa = usePwa(); // true/false
```

## Visibility Status
You can track user behave when they move between tabs,  
So it is helpful to play a music track when the document becomes visible and pauses the music when the document is no longer visible,  
Or even lock the app when they leave it.
```javascript
const isVisible = useVisibility(); // true/false
```

## Add-to-home-screen helper and installation Status
Check user choice on add-to-home-screen prompt with installationStatus.  
**NOTE:** If you set it's initial value as `false` in `useInstallPrompt(false)`, it will show add-to-home-screen popup as soon as possible.
BUT if you want to show a fancy popup to encourage user to install your app set the initial value as `true` like `useInstallPrompt(true)` then you have access to show the popup whenever you want.

```javascript
const [installationStatus, installationEvent] = useInstallPrompt(true);

useEffect(() => {
    // installationStatus is one of these states: null/dismissed/accepted/installed
    if(installationStatus === 'accepted') {
        // User accept it. You can save it in some log with device config.
    }

    // Show Add-to-home-screen prompt, if user have it's condition.
    if(installationEvent) {
        installationEvent.prompt();
    }
})
```

## License
Licensed as MIT. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.