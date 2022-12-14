import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import type TrackService from 'catechesis/services/track';
import { action } from '@ember/object';

interface TopBarSignature {
  Element: HTMLElement;
  Args: {
    name?: string;
  };
}
export default class TopBarComponent extends Component<TopBarSignature> {
  @service declare track: TrackService;

  @action
  trackHome() {
    this.track.event('link - topbar home');
  }

  @action
  trackCatechism() {
    this.track.event('link - topbar catechism', {
      name: this.args.name,
    });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    TopBar: typeof TopBarComponent;
  }
}
