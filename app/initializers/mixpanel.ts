import ENV from 'catechesis/config/environment';
import mixpanel from 'mixpanel-browser';

export function initialize(): void {
  if (ENV.mixpanel.token) {
    mixpanel.init(ENV.mixpanel.token, { debug: ENV.mixpanel.debug });
  }
}

export default {
  initialize,
};
