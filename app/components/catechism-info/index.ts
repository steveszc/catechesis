import templateOnlyComponent from '@ember/component/template-only';

import type { CatechismData } from 'catechism/data';

interface CatechismInfoSignature {
  Element: HTMLInputElement;
  Args: {
    metadata: CatechismData['metadata'];
  };
}

const CatechismInfoComponent = templateOnlyComponent<CatechismInfoSignature>();

export default CatechismInfoComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    CatechismInfo: typeof CatechismInfoComponent;
  }
}
