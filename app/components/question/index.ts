import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

import type { CatechismItem } from 'catechism/data';
import { htmlSafe } from '@ember/template';

interface QuestionComponentSignature {
  Element: HTMLInputElement;
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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Question: typeof QuestionComponent;
  }
}
