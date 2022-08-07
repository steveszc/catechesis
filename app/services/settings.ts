import Service from '@ember/service';
import stored from 'catechesis/decorators/stored';

export default class SettingsService extends Service {
  @stored({ defaultValue: false }) alwaysShowAnswers = false;
  @stored({ defaultValue: false }) pickUpWhereYouLeftOff = false;
}
