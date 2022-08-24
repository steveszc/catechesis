import Component from '@glimmer/component';
import { action } from '@ember/object';
import { catechisms } from 'catechesis/data';
import { inject as service } from '@ember/service';

import type TrackService from 'catechesis/services/track';

interface CatechismListSignature {
  Element: HTMLElement;
  Args: {};
}

export default class CatechismListComponent extends Component<CatechismListSignature> {
  catechisms = catechisms;

  @service declare track: TrackService;

  @action trackLink(id: string) {
    this.track.event('link - catechism', { id });
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    CatechismList: typeof CatechismListComponent;
  }
}
