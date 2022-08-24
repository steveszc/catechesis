import ENV from 'catechesis/config/environment';
import Service, { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TrackService extends Service {
  @service declare fastboot: { isFastBoot: boolean };

  @tracked isMixpanelLoaded = false;

  @action async event(event: string, args?: Record<string, unknown>) {
    if (this.fastboot.isFastBoot || !ENV.mixpanel.token) return;

    const mixpanel = await import('mixpanel-browser');

    if (!this.isMixpanelLoaded) {
      mixpanel.init(ENV.mixpanel.token, {
        debug: ENV.mixpanel.debug,
        loaded: () => {
          this.isMixpanelLoaded = true;
        },
      });
    }

    mixpanel.track(event, args);
  }
}
