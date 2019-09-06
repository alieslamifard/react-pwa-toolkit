import React from 'react'

/**
 * The visibilitychange event is fired at the document when the content of its tab have become visible or have been hidden.
 * The event doesn't include the document's updated visibility status, but you can get that information from the document's visibilityState property.
 * This example begins playing a music track when the document becomes visible, and pauses the music when the document is no longer visible.
 * // todo https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
 * The visibilityState property currently has four possible values: "hidden", "visible", "prerender", and "unloaded".
 */
const useVisibility = () => {
    const [status, setStatus] = React.useState(true)

    /**
     * listen to page visibility change.
     * read more about google page api.
     * known issue: doesn't work on safari.
     */
    const handleVisibilityEvents = () => {
        if (document.visibilityState === 'hidden') {
            setStatus(false);
        }
        if (document.visibilityState === 'visible') {
            setStatus(true);
        }
    };

    React.useEffect(() => {
        window.addEventListener('visibilitychange', handleVisibilityEvents);

        return () => {
            window.removeEventListener('visibilitychange', handleVisibilityEvents);
        }
    }, [status])

    return status
}

export default useVisibility