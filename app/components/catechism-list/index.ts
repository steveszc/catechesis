import Component from '@glimmer/component';
import { action } from '@ember/object';
import { catechisms } from 'catechesis/data';
import mixpanel from 'mixpanel-browser';

interface CatechismListSignature {
  Element: HTMLElement;
  Args: {};
}

export default class CatechismListComponent extends Component<CatechismListSignature> {
  catechisms = catechisms;

  @action trackLink(id: string) {
    mixpanel.track('link - catechism', { id });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    CatechismList: typeof CatechismListComponent;
  }
}
