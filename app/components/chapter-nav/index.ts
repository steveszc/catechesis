import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import type TrackService from 'catechesis/services/track';

import type { ConfessionId, ConfessionChapter } from 'catechesis/data';

interface ChapterNavSignature {
  Element: HTMLElement;
  Args: {
    confessionId: ConfessionId;
    previous?: ConfessionChapter;
    next?: ConfessionChapter;
  };
}

export default class ChapterNavComponent extends Component<ChapterNavSignature> {
  @service declare track: TrackService;

  @action
  trackPreviousChapter() {
    this.track.event('link - previous chapter', {
      confession: this.args.confessionId,
      previous: this.args.previous?.chapter,
    });
  }

  @action
  trackNextChapter() {
    this.track.event('link - next chapter', {
      confession: this.args.confessionId,
      next: this.args.next?.chapter,
    });
  }

  @action
  trackSeeAllChapters() {
    this.track.event('link - See all questions', {
      confession: this.args.confessionId,
    });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ChapterNav: typeof ChapterNavComponent;
  }
}
