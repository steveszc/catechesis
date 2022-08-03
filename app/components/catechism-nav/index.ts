import templateOnlyComponent from '@ember/component/template-only';

import type { CatechismItem } from 'catechesis/data';

interface CatechismNavSignature {
  Element: HTMLElement;
  Args: {
    previous?: CatechismItem;
    next?: CatechismItem;
  };
}

const CatechismNavComponent = templateOnlyComponent<CatechismNavSignature>();

export default CatechismNavComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    CatechismNav: typeof CatechismNavComponent;
  }
}
