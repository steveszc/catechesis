import { action } from '@ember/object';
import Component from '@glimmer/component';
import mixpanel from 'mixpanel-browser';

import type { CatechismId, CatechismItem } from 'catechesis/data';

interface CatechismNavSignature {
  Element: HTMLElement;
  Args: {
    catechismId: CatechismId;
    previous?: CatechismItem;
    next?: CatechismItem;
  };
}

export default class CatechismNavComponent extends Component<CatechismNavSignature> {
  @action
  trackPreviousQuestion() {
    mixpanel.track('link - previous question', {
      catechism: this.args.catechismId,
      previous: this.args.previous?.number,
    });
  }

  @action
  trackNextQuestion() {
    mixpanel.track('link - next question', {
      catechism: this.args.catechismId,
      next: this.args.next?.number,
    });
  }

  @action
  trackSeeAllQuestions() {
    mixpanel.track('link - See all questions', {
      catechism: this.args.catechismId,
    });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    CatechismNav: typeof CatechismNavComponent;
  }
}
