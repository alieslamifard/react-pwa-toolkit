import React from 'react'

const useNetwork = () => {
    const [status, setStatus] = React.useState(true)

    /**
     * keep eyes on network status, either network is online or offline.
     */
    const handleNetworkOnlineEvent = () => {
        setStatus(true);
    };

    /**
     * keep eyes on network status, either network is online or offline.
     */
    const handleNetworkOfflineEvent = () => {
        setStatus(false);
    };

    React.useEffect(() => {
        window.addEventListener('online', handleNetworkOnlineEvent);
        window.addEventListener('offline', handleNetworkOfflineEvent);

        return () => {
            window.removeEventListener('online', handleNetworkOnlineEvent);
            window.removeEventListener('offline', handleNetworkOfflineEvent);
        }
    }, [status])

    return status
}

export default useNetwork