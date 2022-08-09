import templateOnlyComponent from '@ember/component/template-only';

interface ModalFormSignature {
  Element: HTMLElement;
  Args: {
    onSubmit: (event: SubmitEvent) => void;
    onDismiss: () => void;
  };
  Blocks: {
    title: [];
    body: [];
    submit: [];
  };
}

const ModalFormComponent = templateOnlyComponent<ModalFormSignature>();

export default ModalFormComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ModalForm: typeof ModalFormComponent;
  }
}
