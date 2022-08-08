import Service from '@ember/service';
import stored from 'catechesis/decorators/stored';

export default class SettingsService extends Service {
  @stored alwaysShowAnswers = false;
  @stored pickUpWhereYouLeftOff = false;
}
