import templateOnlyComponent from '@ember/component/template-only';

import type { CatechismData } from 'catechism/data';

interface QuestionListSignature {
  Element: HTMLInputElement;
  Args: {
    data: CatechismData['data'];
  };
}

const QuestionListComponent = templateOnlyComponent<QuestionListSignature>();

export default QuestionListComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    QuestionList: typeof QuestionListComponent;
  }
}
