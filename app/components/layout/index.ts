import templateOnlyComponent from '@ember/component/template-only';

interface LayoutSignature {
  Element: HTMLElement;
  Args: {
    name?: string;
  };
  Blocks: {
    default: [];
    half1: [];
    half2: [];
    third1: [];
    third2: [];
    third3: [];
    third23: [];
  };
}

const LayoutComponent = templateOnlyComponent<LayoutSignature>();

export default LayoutComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Layout: typeof LayoutComponent;
  }
}
