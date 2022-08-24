import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import type TrackService from 'catechesis/services/track';
import type { CatechismData, CatechismId } from 'catechesis/data';

interface QuestionListSignature {
  Element: HTMLInputElement;
  Args: {
    catechismId: CatechismId;
    data: CatechismData['data'];
  };
}

export default class QuestionListComponent extends Component<QuestionListSignature> {
  @service declare track: TrackService;

  @action
  trackLink(datum: CatechismData['data'][number]) {
    this.track.event('link - question', {
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
