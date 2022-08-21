import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';

import type { Scripture } from 'catechesis/data/types';

interface ScriptureVerseSignature {
  Element: HTMLElement;
  Args: {
    scripture: Scripture;
  };
}

export default class ScriptureVerseComponent extends Component<ScriptureVerseSignature> {
  @service declare fastboot: { isFastBoot: boolean };

  htmlSafe = htmlSafe;

  get text() {
    return this.args.scripture.text;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ScriptureVerse: typeof ScriptureVerseComponent;
  }
}
