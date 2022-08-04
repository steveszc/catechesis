import '@glint/environment-ember-loose';

import Helper from '@ember/component/helper';
import Component from '@glimmer/component';

interface PageTitleHelperSignature {
  Args: { Positional: [string] };
  Return: void;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
declare class HeadTemplate extends Component<{
  model: Record<string, string>;
}> {}
declare class PageTitleHelper extends Helper<PageTitleHelperSignature> {}
declare class HeadLayoutComponent extends Component {} // eslint-disable-line ember/no-empty-glimmer-component-classes

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    HeadLayout: typeof HeadLayoutComponent;
    'page-title': typeof PageTitleHelper;
    head: typeof HeadTemplate;
  }
}
