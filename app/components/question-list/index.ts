import Component from '@glimmer/component';
import mixpanel from 'mixpanel-browser';
import { action } from '@ember/object';

import type { CatechismData, CatechismId } from 'catechesis/data';

interface QuestionListSignature {
  Element: HTMLInputElement;
  Args: {
    catechismId: CatechismId;
    data: CatechismData['data'];
  };
}

export default class QuestionListComponent extends Component<QuestionListSignature> {
  @action
  trackLink(datum: CatechismData['data'][number]) {
    mixpanel.track('link - question', {
      catechism: this.args.catechismId,
      question: datum.number,
    });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    QuestionList: typeof QuestionListComponent;
  }
}
