import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SettingsService extends Service {
  @tracked alwaysShowAnswers = false;
  @tracked pickUpWhereYouLeftOff = false;
}
