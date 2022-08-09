import Component from '@glimmer/component';

interface PortalSignature {
  Element: HTMLElement;
  Args: {
    target?: string;
  };
  Blocks: {
    default: [];
  };
}

export default class PortalComponent extends Component<PortalSignature> {
  get targetPortal() {
    if (document) {
      let selector = `[data-portal="${this.args.target ?? 'default'}"]`;

      return document.querySelector(selector);
    }

    return null;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Portal: typeof PortalComponent;
  }
}
