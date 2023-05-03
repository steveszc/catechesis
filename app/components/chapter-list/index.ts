import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import type TrackService from 'catechesis/services/track';
import type { ConfessionData, ConfessionId } from 'catechesis/data';

interface ChapterListSignature {
  Element: HTMLInputElement;
  Args: {
    confessionId: ConfessionId;
    data: ConfessionData['data'];
  };
}

export default class ChapterListComponent extends Component<ChapterListSignature> {
  @service declare track: TrackService;

  @action
  trackLink(datum: ConfessionData['data'][number]) {
    this.track.event('link - chapter', {
      confession: this.args.confessionId,
      chapter: datum.chapter,
    });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ChapterList: typeof ChapterListComponent;
  }
}
