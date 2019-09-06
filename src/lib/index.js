// device spec
// isPWA
// isOnline
// visibilityStatus
// installationStatus

import Device from './Device';
import usePwaHook from './usePwa';
import useNetworkHook from './useNetwork';
import useVisibilityHook from './useVisibility';
import useInstallPromptHook from './useInstallPrompt';

export default Device;
export const usePwa = usePwaHook;
export const useNetwork = useNetworkHook;
export const useVisibility = useVisibilityHook;
export const useInstallPrompt = useInstallPromptHook;
