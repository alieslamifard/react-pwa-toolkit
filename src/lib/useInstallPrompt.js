import React from 'react'

/**
 * if doNotPrompt set as true, installation prompt will prevent from pops up, so you can prompt it whenever you want.
 * @param doNotPrompt
 * @returns {[status, event]}
 */
const useInstallPrompt = (doNotPrompt = false) => {
    const [status, setStatus] = React.useState(null)
    const stashEvent = React.useRef(null);

    /**
     * Keep eyes on user choice, when installation prompt pops up.
     */
    const handleInstallationEvents = event => {
        // Stash the event so it can be triggered later.
        stashEvent.current = event;

        if(doNotPrompt) {
            event.preventDefault();
        }

        event.userChoice.then(result => {
            if (result.outcome === 'dismissed') {
                // They dismissed
                setStatus('dismissed');
            } else {
                // User accepted!
                setStatus('accepted');
            }
        });
    };

    const handleAppInstalledEvent = () => {
        // PWA installed.
        setStatus('installed');
    };

    React.useEffect(() => {
        window.addEventListener('beforeinstallprompt', handleInstallationEvents);
        window.addEventListener('appinstalled', handleAppInstalledEvent);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleInstallationEvents);
            window.removeEventListener('appinstalled', handleAppInstalledEvent);
        }
    }, [status])

    return [status, stashEvent.current]
}

export default useInstallPrompt