import '@glint/environment-ember-loose';

import Helper from '@ember/component/helper';

interface PageTitleHelperSignature {
  Args: { Positional: [string] };
  Return: void;
}

declare class PageTitleHelper extends Helper<PageTitleHelperSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'page-title': typeof PageTitleHelper;
  }
}
