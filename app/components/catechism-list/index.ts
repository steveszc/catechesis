import Component from '@glimmer/component';
import { catechisms } from 'catechism/data';

interface CatechismListSignature {
  Element: HTMLElement;
  Args: {};
}

export default class CatechismListComponent extends Component<CatechismListSignature> {
  catechisms = catechisms;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    CatechismList: typeof CatechismListComponent;
  }
}
