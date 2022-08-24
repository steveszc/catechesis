import Component from '@glimmer/component';
import mixpanel from 'mixpanel-browser';
import { action } from '@ember/object';
interface TopBarSignature {
  Element: HTMLElement;
  Args: {
    name?: string;
  };
}
export default class TopBarComponent extends Component<TopBarSignature> {
  @action
  trackHome() {
    mixpanel.track('link - topbar home');
  }

  @action
  trackCatechism() {
    mixpanel.track('link - topbar catechism', {
      name: this.args.name,
    });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    TopBar: typeof TopBarComponent;
  }
}
