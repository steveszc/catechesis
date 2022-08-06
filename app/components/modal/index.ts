import templateOnlyComponent from '@ember/component/template-only';

interface ModalSignature {
  Element: HTMLElement;
  Args: {};
  Blocks: {
    title: [];
    body: [];
    footer: [];
  };
}

const ModalComponent = templateOnlyComponent<ModalSignature>();

export default ModalComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Modal: typeof ModalComponent;
  }
}
