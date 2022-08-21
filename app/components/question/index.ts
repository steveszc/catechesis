import { htmlSafe } from '@ember/template';
import { tracked, cached } from '@glimmer/tracking';
import Component from '@glimmer/component';

import type { CatechismItem } from 'catechesis/data';

interface QuestionComponentSignature {
  Element: HTMLElement;
  Args: {
    data: CatechismItem;
    isAnswerShown: boolean;
    showAnswer: () => void;
  };
  Blocks: {
    default: [];
  };
}

export default class QuestionComponent extends Component<QuestionComponentSignature> {
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
    let id = this.args.data.audio?.[this.audioEmbedIndex]?.links?.find(
      ({ platform }) => platform === 'spotify'
    )?.id;

    return id;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Question: typeof QuestionComponent;
  }
}
