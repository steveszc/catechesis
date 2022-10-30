import { htmlSafe } from '@ember/template';
import { tracked, cached } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import Ember from 'ember';

import type { CatechismId, CatechismItem } from 'catechesis/data';
import type TrackService from 'catechesis/services/track';

interface QuestionComponentSignature {
  Element: HTMLElement;
  Args: {
    catechismId: CatechismId;
    data: CatechismItem;
    isAnswerShown: boolean;
    showAnswer: () => void;
  };
  Blocks: {
    default: [];
  };
}

export default class QuestionComponent extends Component<QuestionComponentSignature> {
  @service declare track: TrackService;
  @tracked audioEmbedIndex = 0;

  htmlSafe = htmlSafe;

  isStringAnswer(answer: CatechismItem['answer']): answer is string {
    return typeof answer === 'string';
  }

  get formattedAnswerWithProofs() {
    if (this.args.data.answerWithProofs) {
      let raw = this.args.data.answerWithProofs;
      let formatted = raw.replace(
        /\[(\d)\]/g,
        (_match: string, proofId: string) => `<sup>${proofId}</sup>`
      );
      return formatted;
    } else {
      return '';
    }
  }

  @cached
  get spotifyId() {
    if (Ember.testing) return undefined;

    let id = this.args.data.audio?.[this.audioEmbedIndex]?.links?.find(
      ({ platform }) => platform === 'spotify'
    )?.id;

    return id;
  }

  @action
  showAnswer() {
    this.args.showAnswer();
    this.track.event('show answer', {
      catechism: this.args.catechismId,
      question: this.args.data.number,
    });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Question: typeof QuestionComponent;
  }
}
