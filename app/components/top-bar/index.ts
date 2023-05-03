import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import type TrackService from 'catechesis/services/track';
import { action } from '@ember/object';

interface TopBarSignature {
  Element: HTMLElement;
  Args: {
    name?: string;
    type?: string;
  };
}
export default class TopBarComponent extends Component<TopBarSignature> {
  @service declare track: TrackService;

  get isViewingCatechism() {
    return this.args.type === 'Catechism';
  }

  get isViewingConfession() {
    return this.args.type === 'Confession';
  }

  get showIndexLink() {
    return this.args.name && this.args.type;
  }

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
