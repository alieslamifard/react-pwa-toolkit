import React from 'react'

const usePwa = () => {
    const [status, setStatus] = React.useState(false)

    React.useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone) {
            setStatus(true);
        }
    }, [status])

    return status
}

export default usePwa