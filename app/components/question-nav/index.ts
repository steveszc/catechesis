import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import type TrackService from 'catechesis/services/track';
import type { CatechismId } from 'catechesis/data';

interface QuestionNavSignature {
  Element: HTMLElement;
  Args: {
    catechismId: CatechismId;
    questionNumber: number;
  };
}

export default class QuestionNavComponent extends Component<QuestionNavSignature> {
  @service declare track: TrackService;

  @action
  trackScripture() {
    this.track.event('link - scripture', {
      catechism: this.args.catechismId,
      question: this.args.questionNumber,
    });
  }

  @action
  trackCommentry() {
    this.track.event('link - commentary', {
      catechism: this.args.catechismId,
      question: this.args.questionNumber,
    });
  }

  @action
  trackPrayer() {
    this.track.event('link - prayer', {
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
