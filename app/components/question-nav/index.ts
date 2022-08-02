import templateOnlyComponent from '@ember/component/template-only';

interface QuestionNavSignature {
  Element: HTMLElement;
  Args: {};
}

const QuestionNavComponent = templateOnlyComponent<QuestionNavSignature>();

export default QuestionNavComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    QuestionNav: typeof QuestionNavComponent;
  }
}
