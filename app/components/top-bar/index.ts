import templateOnlyComponent from '@ember/component/template-only';

interface TopBarSignature {
  Element: HTMLElement;
  Args: {
    name?: string;
  };
}
const TopBarComponent = templateOnlyComponent<TopBarSignature>();
export default TopBarComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    TopBar: typeof TopBarComponent;
  }
}
