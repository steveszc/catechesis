import templateOnlyComponent from '@ember/component/template-only';

interface LayoutSignature {
  Element: HTMLElement;
  Args: {
    name?: string;
  };
  Blocks: {
    default: [];
    splitA: [];
    splitB: [];
  };
}

const LayoutComponent = templateOnlyComponent<LayoutSignature>();

export default LayoutComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Layout: typeof LayoutComponent;
  }
}
