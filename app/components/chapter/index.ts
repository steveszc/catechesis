import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

import type { ConfessionId, ConfessionChapter } from 'catechesis/data';
import type TrackService from 'catechesis/services/track';

interface ChapterComponentSignature {
  Element: HTMLElement;
  Args: {
    confessionId: ConfessionId;
    data: ConfessionChapter;
  };
  Blocks: {
    default: [];
  };
}

export default class ChapterComponent extends Component<ChapterComponentSignature> {
  @service declare track: TrackService;

  htmlSafe = htmlSafe;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Chapter: typeof ChapterComponent;
  }
}
