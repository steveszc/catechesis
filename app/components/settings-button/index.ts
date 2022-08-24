import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type SettingsService from 'catechesis/services/settings';
import type TrackService from 'catechesis/services/track';

interface SettingsButtonSignature {
  Element: HTMLButtonElement;
  Args: {};
  Blocks: {
    default: [];
  };
}

export default class SettingsButtonComponent extends Component<SettingsButtonSignature> {
  @service declare settings: SettingsService;
  @service declare track: TrackService;

  @tracked isShowingSettings = false;

  @action toggleSettings() {
    this.isShowingSettings = !this.isShowingSettings;
    this.track.event('Open settings', {
      alwaysShowAnswers: this.settings.alwaysShowAnswers ? 'on' : 'off',
      pickUpWhereYouLeftOff: this.settings.pickUpWhereYouLeftOff ? 'on' : 'off',
    });
  }

  @action hideSettings() {
    this.isShowingSettings = false;
  }

  @action saveSettings(event: SubmitEvent) {
    event.preventDefault();
    if (event.target) {
      const data = new FormData(event.target as HTMLFormElement);

      const alwaysShowAnswers = data.get('alwaysShowAnswers');
      const pickUpWhereYouLeftOff = data.get('pickUpWhereYouLeftOff');

      this.settings.alwaysShowAnswers = alwaysShowAnswers === 'on';
      this.settings.pickUpWhereYouLeftOff = pickUpWhereYouLeftOff === 'on';

      this.track.event('save settings', {
        alwaysShowAnswers,
        pickUpWhereYouLeftOff,
      });
    }

    this.isShowingSettings = false;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SettingsButton: typeof SettingsButtonComponent;
  }
}
