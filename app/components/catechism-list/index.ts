import templateOnlyComponent from '@ember/component/template-only';

interface CatechismListSignature {
  Element: HTMLElement;
  Args: {};
}

const CatechismListComponent = templateOnlyComponent<CatechismListSignature>();

export default CatechismListComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    CatechismList: typeof CatechismListComponent;
  }
}
