import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import type TrackService from 'catechesis/services/track';

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
  @service declare track: TrackService;

  @action
  trackPreviousQuestion() {
    this.track.event('link - previous question', {
      catechism: this.args.catechismId,
      previous: this.args.previous?.number,
    });
  }

  @action
  trackNextQuestion() {
    this.track.event('link - next question', {
      catechism: this.args.catechismId,
      next: this.args.next?.number,
    });
  }

  @action
  trackSeeAllQuestions() {
    this.track.event('link - See all questions', {
      catechism: this.args.catechismId,
    });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    CatechismNav: typeof CatechismNavComponent;
  }
}
