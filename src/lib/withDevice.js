/**
 * withDevice HOC
 * Access to most use-full PWA apis and device detections
 * TODO complete readme for options
 * @param WrappedComponent
 * @param options (array) available values: networkStatus, installationStatus, visibilityStatus
 * @returns React Component
 */

import React from 'react';
import Bowser from 'bowser';

const withDevice = (options = []) => WrappedComponent => {
  const hasNetwork = options.includes('networkStatus');
  const hasInstall = options.includes('installationStatus');
  const hasVisibility = options.includes('visibilityStatus');

  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        networkStatus: true, // bool
        installationPromptStatus: null, // dismissed/accepted/installed
        visible: null, // hidden/visible
      };
    }

    componentDidMount() {
      if (hasVisibility) {
        window.addEventListener(
          'visibilitychange',
          this.handleVisibilityEvents,
        );
      }

      if (hasNetwork) {
        window.addEventListener('online', this.handleNetworkOnlineEvent);
        window.addEventListener('offline', this.handleNetworkOfflineEvent);
      }

      if (hasInstall) {
        window.addEventListener(
          'beforeinstallprompt',
          this.handleInstallationEvents,
        );
        window.addEventListener('appinstalled', this.handleAppInstalledEvent);
      }
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleNetworkOnlineEvent);
      window.removeEventListener('offline', this.handleNetworkOfflineEvent);
      window.removeEventListener(
        'beforeinstallprompt',
        this.handleInstallationEvents,
      );
      window.removeEventListener(
        'visibilitychange',
        this.handleVisibilityEvents,
      );
      window.removeEventListener('appinstalled', this.handleAppInstalledEvent);
    }

    /**
     * listen to page visibility change.
     * read more about google page api.
     * known issue: doesn't work on safari.
     */
    handleVisibilityEvents = () => {
      if (window.visibilityState === 'hidden') {
        this.setState({
          visible: 'hidden',
        });
      }
      if (window.visibilityState === 'visible') {
        this.setState({
          visible: 'visible',
        });
      }
    };

    /**
     * keep eyes on network status, either network is online or offline.
     */
    handleNetworkOnlineEvent = () => {
      this.setState({
        networkStatus: true,
      });
    };

    /**
     * keep eyes on network status, either network is online or offline.
     */
    handleNetworkOfflineEvent = () => {
      this.setState({
        networkStatus: false,
      });
    };

    /**
     * Keep eyes on user choice, when installation prompt pops up.
     */
    handleInstallationEvents = event => {
      // Stash the event so it can be triggered later.
      event.preventDefault();
      event.prompt();

      event.userChoice.then(result => {
        if (result.outcome === 'dismissed') {
          // They dismissed
          this.handleInstallationStatus('dismissed');
        } else {
          // User accepted!
          this.handleInstallationStatus('accepted');
        }
      });
    };

    handleAppInstalledEvent = () => {
      this.handleInstallationStatus('installed');
    };

    /**
     * keep network status on change
     * @param status (bool)
     */
    handleInstallationStatus = status => {
      this.setState({
        installationPromptStatus: status,
      });
    };

    /**
     * return wrapped component with extra props
     * @returns React Component
     */
    render() {
      const { networkStatus, installationPromptStatus, visible } = this.state;
      const props = {
        ...this.props,
      };

      if (hasNetwork) {
        props.networkStatus = networkStatus;
      }

      if (hasInstall) {
        props.installationStatus = installationPromptStatus;
      }

      /**
       * is this WEB-APP?.
       */
      props.standalone = !!(
        process.browser &&
        (window?.matchMedia('(display-mode: standalone)').matches ||
          window?.navigator.standalone)
      );

      if (process.browser && window?.navigator) {
        props.browserSpec = Bowser.parse(window.navigator.userAgent);
      }

      props.visible = visible;

      return <WrappedComponent {...props} />;
    }
  };
};

export default withDevice;
