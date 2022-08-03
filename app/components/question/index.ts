import { tracked, cached } from '@glimmer/tracking';
import Component from '@glimmer/component';

import type { CatechismItem } from 'catechesis/data';
import { htmlSafe } from '@ember/template';

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

  isStringAnswer(answer: CatechismItem['answer']): answer is string {
    return typeof answer === 'string';
  }

  @cached
  get spotifyEmbed() {
    let embedCode = this.args.data.audio?.[this.audioEmbedIndex]?.links?.find(
      ({ platform }) => platform === 'spotify'
    )?.embed;

    if (embedCode) {
      return htmlSafe(embedCode);
    } else {
      return undefined;
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
