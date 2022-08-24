import Component from '@glimmer/component';
import mixpanel from 'mixpanel-browser';
import { action } from '@ember/object';
import type { CatechismId } from 'catechesis/data';

interface QuestionNavSignature {
  Element: HTMLElement;
  Args: {
    catechismId: CatechismId;
    questionNumber: number;
  };
}

export default class QuestionNavComponent extends Component<QuestionNavSignature> {
  @action
  trackScripture() {
    mixpanel.track('link - scripture', {
      catechism: this.args.catechismId,
      question: this.args.questionNumber,
    });
  }

  @action
  trackCommentry() {
    mixpanel.track('link - commentary', {
      catechism: this.args.catechismId,
      question: this.args.questionNumber,
    });
  }

  @action
  trackPrayer() {
    mixpanel.track('link - prayer', {
      catechism: this.args.catechismId,
      question: this.args.questionNumber,
    });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    QuestionNav: typeof QuestionNavComponent;
  }
}
