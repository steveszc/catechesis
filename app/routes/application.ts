import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import type HeadDataService from 'catechesis/services/head-data';
import type SettingsService from 'catechesis/services/settings';
import type Transition from '@ember/routing/-private/transition';

export default class ApplicationRoute extends Route {
  @service declare headData: HeadDataService;
  @service declare settings: SettingsService;

  beforeModel() {
    this.headData.description =
      'Catechesis is an open-source catechism app designed to help you catechize yourself, your family, and your church - by engaging with catechisms that have stood the test of time throughout the church age.';
  }

  afterModel(_model: never, transition: Transition) {
    this.settings.doPickupWhereYouLeftOff(transition);
  }
}
